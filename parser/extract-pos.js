function extractPOS(text = "") {
  const pos = [];

  if (/===\s*Noun\s*===/i.test(text)) pos.push("noun");
  if (/===\s*Verb\s*===/i.test(text)) pos.push("verb");
  if (/===\s*Adjective\s*===/i.test(text)) pos.push("adjective");
  if (/===\s*Adverb\s*===/i.test(text)) pos.push("adverb");

  return pos;
}

module.exports = { extractPOS };