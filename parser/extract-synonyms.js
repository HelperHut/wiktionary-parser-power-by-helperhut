function extractSynonyms(text = "") {
  const match = text.match(/\{\{synonyms\|[^|]*\|([^}]+)\}\}/);

  if (!match) return [];

  return match[1]
    .split("|")
    .map(s => s.trim())
    .filter(Boolean);
}

module.exports = { extractSynonyms };