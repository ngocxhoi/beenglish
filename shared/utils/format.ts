function fmt(s: number) {
  const m = Math.floor(s / 60)
  const ss = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${ss}`
}

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9'\s]/g, '').trim()
}

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, '-')
    .trim()
}

function compare(input: string, target: string) {
  const inWords = norm(input).split(/\s+/).filter(Boolean)
  const tgtWords = target.split(/\s+/)
  const parts = tgtWords.map((w, i) => ({
    word: w,
    ok: norm(inWords[i] ?? '') === norm(w)
  }))
  const correctCount = parts.filter(p => p.ok).length
  return {
    parts,
    correctCount,
    totalWords: tgtWords.length,
    allCorrect: correctCount === tgtWords.length && inWords.length > 0
  }
}

export { fmt, norm, toSlug, compare }
