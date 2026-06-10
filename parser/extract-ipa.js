function extractIPA(text = "") {
  const match = text.match(/\{\{IPA\|([^}]+)\}\}/);
  return match ? match[1] : null;
}

module.exports = { extractIPA };