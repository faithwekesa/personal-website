export const PROFILE = {
  name: 'Faith Wekesa',
  role: 'Software Engineer',
  base: 'Nairobi, Kenya',
  github: 'https://github.com/faithwekesa',
  linkedin: 'https://www.linkedin.com/in/faith-nasimiyu-wekesa/',
  email: 'faithwekesanas@gmail.com',
  phone: '254115305173',
  cv: '/faith-wekesa-cv.pdf',
};

export const WHATSAPP = `https://wa.me/${PROFILE.phone}?text=${encodeURIComponent('Hi Faith, I saw your portfolio')}`;

export const PROJECTS = [
  {
    id: 'safari',
    title: 'Safari Atlas',
    host: 'safari-atlas.vercel.app',
    text: 'Shows what a trip to 15 places in Africa will cost for your days and group before you book anything.',
    role: 'Design and development',
    year: '2026',
    problem: 'A slider of beautiful places does not help someone decide where they can actually afford to go, because the question that decides a trip is what it will cost. The aim was a planner that answers that question before anyone books.',
    built: [
      'A budget planner for 15 places in Africa. You enter your budget and days and group size and travel style and it shows what fits.',
      'A cost model that adds the stay per room per night and food and transport per person per day and park fees with a season multiplier.',
      'A Plan your visit panel on every place with the best time to go and a cost breakdown and a clear verdict on whether it fits.',
      'Booking links for stays and flights and tours and a compare view. Prices are estimates and the page shows when they were last checked.',
    ],
    tags: ['React', 'Vite', 'JavaScript', 'Responsive design', 'CSS animation', 'Budget estimates', 'Booking links', 'Vercel'],
    live: 'https://safari-atlas.vercel.app',
    repo: 'https://github.com/faithwekesa/safari-atlas',
  },
  {
    id: 'bake',
    title: 'Hearth and Honey',
    host: 'hearth-and-honey.vercel.app',
    text: 'A bakery website where customers browse the menu and send their order straight to WhatsApp.',
    role: 'Design and development',
    year: '2026',
    problem: 'Small bakeries often take orders through scattered messages. The aim was a website where customers browse the menu, build a basket and send the whole order to the bakery on WhatsApp, so ordering is simple for the customer and for the owner.',
    built: [
      'A clean white responsive website with the menu and photos of the bakes.',
      'A basket where customers add items and send the whole order to the bakery on WhatsApp.',
      'Text and menu sizes tuned for phones since most customers browse on mobile.',
    ],
    tags: ['React', 'Vite', 'CSS', 'Responsive design', 'WhatsApp orders', 'GitHub', 'Vercel'],
    live: 'https://hearth-and-honey.vercel.app',
    repo: 'https://github.com/faithwekesa/hearth-and-honey',
  },
  {
    id: 'nail',
    title: 'Gloss Nail Studio',
    host: 'nailshop-website-seven.vercel.app',
    text: 'Lets salon clients pick a service and a time while the owner gets a WhatsApp alert for every booking.',
    role: 'Design and development',
    year: '2026',
    problem: 'A nail studio that takes bookings by phone and messages loses time on back and forth. The aim was a booking page where clients choose a style and a time themselves and the owner hears about every booking quickly.',
    built: [
      'A booking flow where clients pick a service and a time on a calendar and can add a custom style request.',
      'A Supabase PostgreSQL database with authentication and row-level security. Each phone number is limited to 2 bookings and each booking is pending or confirmed or declined.',
      'WhatsApp alerts so the owner gets every new booking in one tap since a nail technician rarely checks email.',
      'A private owner dashboard with a Today view plus a gallery and a mobile menu on the public site.',
    ],
    tags: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Row-level security', 'WhatsApp alerts', 'Responsive design', 'Vercel'],
    live: 'https://nailshop-website-seven.vercel.app',
    repo: 'https://github.com/faithwekesa/nailshop-website',
  },
  {
    id: 'fan',
    title: 'The Kardashians Fan Page',
    host: 'my-fan-page-bay.vercel.app',
    text: 'A responsive fan site with profile cards, likes that stay after a refresh and an About page for each family member.',
    role: 'Design and development',
    year: '2026',
    problem: 'The aim was to build a complete multi-page site around one subject, using reusable components, state that survives a page refresh and a layout that works on phones and desktops.',
    built: [
      'A grid of profile cards built from one reusable component, each with a photo, a short blurb and a link to Instagram.',
      'A like button with a double tap on the photo. Likes are saved in the browser, so they are still there after a refresh, and the page still works when saving is blocked.',
      'An About page with a longer profile for each family member.',
      'A layout that moves from one column on phones to three on large screens, with a soft background image behind the cards.',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'localStorage', 'Responsive design', 'GitHub', 'Vercel'],
    live: 'https://my-fan-page-bay.vercel.app',
    repo: 'https://github.com/faithwekesa/my-fan-page',
  },
  {
    id: 'rag',
    title: 'Research Assistant (RAG)',
    host: 'github.com/faithwekesa/rag-research-assistant',
    text: 'Answers questions about 43 arXiv papers and cites the exact source for every claim, or says so when the answer is not in the papers.',
    role: 'Design and development',
    year: '2026',
    status: 'Built and tested',
    problem: 'The aim was to build a retrieval-augmented generation system end to end and test it honestly. Answers had to be checkable against their sources instead of taken on trust, and the system had to say so when it did not know.',
    built: [
      'Cleaned the text of 43 arXiv PDFs with PyMuPDF and split it into 4,127 chunks that keep their file name and page.',
      'Embedded the chunks locally with BAAI/bge-small-en-v1.5 and stored them in ChromaDB with cosine distance, saved to disk so nothing is re-embedded on the next run.',
      'A retrieval gate that skips the language model when the best match is weak, so questions outside the papers get an honest not-found instead of a guess.',
      'Answers generated with openai/gpt-oss-120b through Groq under a prompt with grounding, abstention and citation rules, followed by a check that every citation points at a chunk that was really retrieved.',
      'A web chat page where each answer has source cards that link back to the paper on arXiv.',
      'An evaluation on 10 questions with the checks computed in code: 7 of 10 correct overall, 7 of 8 retrieval hits and both out-of-scope questions declined.',
    ],
    shots: [
      { src: '/rag-demo.png', alt: 'The Research Assistant chat page showing source cards with match scores, and a question outside the papers being declined', caption: 'The chat page lists the papers behind an answer with their match scores, and declines a question the papers do not cover.' },
    ],
    results: [
      ['Right chunk retrieved', '7/8'],
      ['Answer correct (in scope)', '5/8'],
      ['Faithful to sources (in scope)', '7/8'],
      ['Out-of-scope questions declined', '2/2'],
      ['Overall correct', '7/10'],
    ],
    snippets: [
      {
        title: 'Retrieve the closest chunks',
        code: String.raw`def retrieve(query, k=TOP_K):
    q = embedder.encode([QUERY_PREFIX + query], normalize_embeddings=True)[0].tolist()
    res = collection.query(query_embeddings=[q], n_results=k)
    return [
        {"chunk_id": res["ids"][0][i], "text": res["documents"][0][i], "score": 1 - res["distances"][0][i]}
        for i in range(len(res["ids"][0]))
    ]`,
      },
      {
        title: 'Skip the model when retrieval is weak',
        code: String.raw`top = hits[0]["score"] if hits else 0.0
if top < MIN_SIMILARITY:
    return {"answer": ABSTAIN, "abstained": True, "llm_called": False}
answer = generate(production_prompt(query, format_context(hits)))`,
      },
      {
        title: 'Check every citation was really retrieved',
        code: String.raw`CITE = re.compile(r"\[File:\s*([^,\]]+),\s*Chunk:\s*([^\]\s]+)\s*\]")

def check_citations(answer, hits):
    valid = {h["chunk_id"] for h in hits}
    cited = [m.group(2) for m in CITE.finditer(answer)]
    return {"cited": cited, "all_valid": bool(cited) and all(c in valid for c in cited)}`,
      },
    ],
    tags: ['Python', 'RAG', 'ChromaDB', 'sentence-transformers', 'PyMuPDF', 'Groq API', 'Evaluation', 'GitHub'],
    repo: 'https://github.com/faithwekesa/rag-research-assistant',
  },
];

export const ABOUT = [
  { label: 'Based in', items: ['Nairobi, Kenya'] },
  { label: 'Build', items: ['React', 'Next.js', 'JavaScript', 'TypeScript'] },
  { label: 'Backend', items: ['Python', 'FastAPI', 'Supabase', 'Postman'] },
  { label: 'Design', items: ['Figma', 'User flows', 'Research'] },
  { label: 'Also studied', items: ['Product management', 'Cyber security'] },
];

export const DOING = [
  { n: '01', title: 'Build', text: 'Responsive web apps in React and Next.js. When a product needs data and sign-in I back it with FastAPI or Supabase.' },
  { n: '02', title: 'Design', text: 'User research and flows and screens in Figma so what I build starts from what people actually need.' },
  { n: '03', title: 'Ship with care', text: 'Authentication and role-based access and written test cases and Postman checks and deployment on Vercel through GitHub.' },
];
