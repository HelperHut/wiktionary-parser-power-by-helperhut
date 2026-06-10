const { cleanText } = require("./clean");

function extractDefinition(text = "") {
  const defs = [];

  for (const line of text.split("\n")) {
    if (line.startsWith("#")) {
      const d = cleanText(line.replace(/^#+\s*/, ""));
      if (d) defs.push(d);
    }
  }

  return defs.slice(0, 5);
}

module.exports = { extractDefinition };