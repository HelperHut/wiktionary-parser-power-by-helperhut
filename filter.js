// filter.js

const fs = require("fs");
const readline = require("readline");

const INPUT_FILE = "./data/output/structured.ndjson";
const OUTPUT_FILE = "./data/filter/dictionary.ndjson";

const validPOS = new Set([
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
  "conjunction",
  "interjection",
  "determiner",
  "article",
  "numeral",
  "participle",
  "proper noun",
]);

const rl = readline.createInterface({
  input: fs.createReadStream(INPUT_FILE, {
    encoding: "utf8",
  }),
  crlfDelay: Infinity,
});

const writer = fs.createWriteStream(OUTPUT_FILE, {
  encoding: "utf8",
});

let total = 0;
let filtered = 0;

rl.on("line", (line) => {
  total++;

  try {
    const obj = JSON.parse(line);

    // word must exist
    if (!obj.word) return;

    // skip namespaces
    if (obj.word.includes(":")) return;

    // only single words (optional)
    if (!/^[a-zA-Z'-]+$/.test(obj.word)) return;

    // must have valid POS
    if (
      !Array.isArray(obj.pos) ||
      !obj.pos.some((p) => validPOS.has(p.toLowerCase()))
    ) {
      return;
    }

    writer.write(JSON.stringify(obj) + "\n");
    filtered++;
  } catch (err) {
    // ignore bad json lines
  }
});

rl.on("close", () => {
  writer.end();

  console.log("Finished");
  console.log("Total:", total);
  console.log("Filtered:", filtered);
  console.log("Saved:", OUTPUT_FILE);
});