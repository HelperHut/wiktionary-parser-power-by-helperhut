# Wiktionary Dictionary Builder

A high-performance Node.js pipeline that parses the latest English Wiktionary XML dump (.bz2) and converts it into a structured, filtered dictionary dataset in NDJSON format.

This project streams large dumps efficiently, extracts word data, and generates clean datasets for NLP, dictionary apps, and language tools.

What It Does

- Streams `.bz2` Wiktionary dump (no full memory load)
- Extracts `<page>` entries
- Parses:
  - Word (title)
  - Parts of speech (POS)
  - Definitions
  - IPA pronunciation
  - Synonyms
  - Translations
- Filters invalid entries
- Outputs NDJSON dataset

📥 Download Dump

*Download here:*

*https://dumps.wikimedia.org/enwiktionary/latest/enwiktionary-latest-pages-articles.xml.bz2*

🛠 Setup + Run (ONE BLOCK)

```bash
git clone https://github.com/your-username/wiktionary-parser.git
cd wiktionary-parser

npm install

mkdir -p data/output data/filter

# Set your input file path in build.js:
# const INPUT = "D:\\Downloads\\enwiktionary-latest-pages-articles.xml.bz2";

# Run build
node build.js

# Run filter
node filter.js
