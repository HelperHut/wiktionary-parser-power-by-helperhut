function extractTranslations(text = "") {
  const block = text.match(/==Translations==([\s\S]*?)(\n==|$)/);

  if (!block) return {};

  const lines = block[1].split("\n");

  const out = {};

  for (const line of lines) {
    const m = line.match(/^([^:|]+)\s*[:|]\s*(.+)$/);
    if (m) {
      out[m[1].trim()] = m[2].trim();
    }
  }

  return out;
}

module.exports = { extractTranslations };