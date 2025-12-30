export function cosineSimilarity(a, b) {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (magA * magB);
}

export function semanticSearch(queryEmbedding, messages, filters) {
  return messages
    .map(m => ({
      ...m,
      score: cosineSimilarity(queryEmbedding, m.embedding)
    }))
    .filter(m => m.score > 0.55)
    .filter(m => {
      if (filters?.type && m.type !== filters.type) return false;
      if (filters?.conversation && m.conversation !== filters.conversation) return false;
      return true;
    })
    .sort((a, b) => b.score - a.score)
    .map(m => ({
      ...m,
      reason:
        m.type === "pdf"
          ? "Found via document text"
          : m.type === "photo"
          ? "Found via image description"
          : "Found via message context"
    }));
}
