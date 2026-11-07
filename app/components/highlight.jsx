const TOKEN = /("[^"]*"?)|(<\/?[A-Za-z]*)|(\b(?:export|default|const|function|return)\b)|([{}()[\];,.=>/:]+)|(\w+)|(\s+|.)/g;

export function highlight(text) {
  const out = [];
  let m;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    const cls = m[1] ? 'k-str' : m[2] ? 'k-tag' : m[3] ? 'k-kw' : m[4] ? 'k-pun' : '';
    out.push(cls ? <span className={cls} key={i}>{m[0]}</span> : m[0]);
    i += 1;
  }
  return out;
}

