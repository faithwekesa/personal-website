import json
import os
import re
import sys
import urllib.error
import time
import urllib.request
from http.server import BaseHTTPRequestHandler
from pathlib import Path

import numpy as np
import onnxruntime as ort
from tokenizers import Tokenizer

DATA = Path(__file__).resolve().parent.parent / "rag_data"
LLM_MODEL = "openai/gpt-oss-120b"
TOP_K = 4
MIN_SIMILARITY = 0.45
MAX_QUERY = 300
PER_IP = 20
WINDOW = 600
DAILY = 1000
QUERY_PREFIX = "Represent this sentence for searching relevant passages: "
ABSTAIN = "I cannot find the answer to this query in the provided source documents."
CITE = re.compile(r"\[File:\s*([^,\]]+),\s*Chunk:\s*([^\]\s]+)\s*\]")

tokenizer = Tokenizer.from_file(str(DATA / "tokenizer.json"))
tokenizer.enable_truncation(max_length=512)
tokenizer.enable_padding()
session = ort.InferenceSession(str(DATA / "model.int8.onnx"), providers=["CPUExecutionProvider"])
vectors = np.load(DATA / "vectors.npy")
chunks = json.load(open(DATA / "chunks.json"))

hits_by_ip = {}
daily = {"day": None, "n": 0}


def allowed(ip):
    now = time.time()
    day = time.strftime("%Y-%m-%d", time.gmtime(now))
    if daily["day"] != day:
        daily["day"], daily["n"] = day, 0
    if daily["n"] >= DAILY:
        return False
    recent = [t for t in hits_by_ip.get(ip, []) if now - t < WINDOW]
    if len(recent) >= PER_IP:
        hits_by_ip[ip] = recent
        return False
    recent.append(now)
    hits_by_ip[ip] = recent
    daily["n"] += 1
    return True


def embed(text):
    enc = tokenizer.encode(text)
    feed = {
        "input_ids": np.array([enc.ids], dtype="int64"),
        "attention_mask": np.array([enc.attention_mask], dtype="int64"),
        "token_type_ids": np.array([enc.type_ids], dtype="int64"),
    }
    out = session.run(None, feed)[0][:, 0, :]
    return (out / np.linalg.norm(out, axis=1, keepdims=True))[0]


def retrieve(query):
    q = embed(QUERY_PREFIX + query)
    scores = vectors @ q
    top = np.argsort(-scores)[:TOP_K]
    return [dict(chunks[i], score=float(scores[i])) for i in top]


def prompt_for(query, hits):
    context = "\n\n".join(
        f"[File: {h['file']}, Chunk: {h['id']}, Page: {h['page']}] {h['text']}" for h in hits
    )
    return f'''You are a careful research assistant answering questions about academic papers on retrieval-augmented generation and embeddings.

Rules:
1. Grounding: answer using ONLY the context fragments below. Do not use outside knowledge and do not guess.
2. Abstention: if the fragments do not contain the answer, reply with exactly: "{ABSTAIN}"
3. Citation: after each claim, cite its source in this exact form: [File: name.pdf, Chunk: chunk_id]

Example 1
Context: [File: paper_a.pdf, Chunk: paper_a_c004, Page: 2] The retriever scores passages with a dot product between query and passage vectors.
Question: How does the retriever score passages?
Answer: It scores passages with a dot product between the query vector and the passage vector [File: paper_a.pdf, Chunk: paper_a_c004].

Example 2
Context: [File: paper_b.pdf, Chunk: paper_b_c010, Page: 5] The model was trained for three epochs on a single GPU.
Question: What is the capital of France?
Answer: {ABSTAIN}

Context:
{context}

Question: {query}
Answer:'''


def generate(prompt):
    body = json.dumps({
        "model": LLM_MODEL,
        "temperature": 0,
        "max_tokens": 2000,
        "reasoning_effort": "low",
        "messages": [{"role": "user", "content": prompt}],
    }).encode()
    req = urllib.request.Request(
        "https://api.groq.com/openai/v1/chat/completions",
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + os.environ["GROQ_API_KEY"],
            "User-Agent": "faith-portfolio-rag/1.0",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=45) as r:
        data = json.loads(r.read())
    return (data["choices"][0]["message"].get("content") or "").strip()


def ask(query):
    hits = retrieve(query)
    top = hits[0]["score"] if hits else 0.0
    sources = [
        {
            "chunk_id": h["id"],
            "file": h["file"],
            "page": h["page"],
            "score": round(h["score"], 3),
            "snippet": h["text"][:260].replace("\n", " "),
            "url": "https://arxiv.org/abs/" + h["file"].replace(".pdf", ""),
        }
        for h in hits
    ]
    if top < MIN_SIMILARITY:
        return {"answer": ABSTAIN, "abstained": True, "top_score": round(top, 3), "sources": sources, "citations_valid": None}
    answer = generate(prompt_for(query, hits))
    valid = {h["id"] for h in hits}
    cited = [m.group(2) for m in CITE.finditer(answer)]
    return {
        "answer": answer,
        "abstained": ABSTAIN in answer,
        "top_score": round(top, 3),
        "sources": sources,
        "citations_valid": bool(cited) and all(c in valid for c in cited),
    }


class handler(BaseHTTPRequestHandler):
    def reply(self, code, obj):
        data = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self):
        ip = (self.headers.get("x-forwarded-for") or "unknown").split(",")[0].strip()
        try:
            size = int(self.headers.get("Content-Length", 0))
            query = json.loads(self.rfile.read(size))["query"].strip()
        except Exception:
            return self.reply(400, {"error": "Please type a question."})
        if not query:
            return self.reply(400, {"error": "Please type a question."})
        if not allowed(ip):
            return self.reply(429, {"error": "Demo limit reached. Please try again in a few minutes."})
        try:
            self.reply(200, ask(query[:MAX_QUERY]))
        except urllib.error.HTTPError as e:
            print("groq http error", e.code, e.read()[:300], file=sys.stderr)
            self.reply(500, {"error": "The assistant is unavailable right now (code " + str(e.code) + "). Please try again."})
        except KeyError:
            print("GROQ_API_KEY is not set", file=sys.stderr)
            self.reply(500, {"error": "The assistant is not configured yet (missing key)."})
        except Exception as e:
            print("ask failed", repr(e), file=sys.stderr)
            self.reply(500, {"error": "The assistant is unavailable right now. Please try again."})
