const fs = require("fs");
const path = require("path");
const bz2 = require("unbzip2-stream");
const readline = require("readline");

const { extractDefinition } = require("./parser/extract-basic");
const { extractPOS } = require("./parser/extract-pos");
const { extractIPA } = require("./parser/extract-ipa");
const { extractSynonyms } = require("./parser/extract-synonyms");
const { extractTranslations } = require("./parser/extract-translations");

const INPUT =
  "D:\\Downloads\\enwiktionary-latest-pages-articles.xml.bz2"; //YourLocalPath

const OUTPUT = path.join(__dirname, "./data/output/structured.ndjson");

const out = fs.createWriteStream(OUTPUT, { flags: "w" });

function extractTitleAndText(block) {
  const title = block.match(/<title>(.*?)<\/title>/)?.[1];
  const text = block.match(/<text[^>]*>([\s\S]*?)<\/text>/)?.[1] || "";
  return { title, text };
}

function parsePage(pageXml) {
  const { title, text } = extractTitleAndText(pageXml);

  if (!title || !text) return null;

  return {
    word: title,
    pos: extractPOS(text),
    definitions: extractDefinition(text),
    ipa: extractIPA(text),
    synonyms: extractSynonyms(text),
    translations: extractTranslations(text),
  };
}

async function build() {
  console.log("🚀 Streaming .bz2 Wiktionary parser started...");

  const stream = fs
    .createReadStream(INPUT)
    .pipe(bz2()); // 🔥 decompress on the fly

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let pageBlock = "";
  let inside = false;
  let count = 0;

  const MAX_SIZE = 5 * 1024 * 1024; // safety limit

  for await (const line of rl) {
    if (line.includes("<page>")) {
      inside = true;
      pageBlock = "";
    }

    if (inside) {
      pageBlock += line + "\n";

      if (pageBlock.length > MAX_SIZE) {
        inside = false;
        pageBlock = "";
        continue;
      }
    }

    if (line.includes("</page>")) {
      inside = false;

      const result = parsePage(pageBlock);

      if (result) {
        out.write(JSON.stringify(result) + "\n");
        count++;
      }

      if (count % 1000 === 0) {
        console.log("Processed:", count);
      }

      pageBlock = "";
    }
  }

  out.end();
  console.log("✅ DONE → structured.ndjson");
}

build();
