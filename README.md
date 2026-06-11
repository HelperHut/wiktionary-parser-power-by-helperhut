# Wiktionary Dictionary Builder

A Node.js pipeline that parses the latest **English Wiktionary XML dump (.bz2)** and converts it into a structured, filtered dictionary dataset in NDJSON format.

It is designed for large-scale processing, memory efficiency, and NLP/dictionary use cases.

## What This Project Does

This tool:

1. Streams a large Wiktionary `.bz2` dump
2. Extracts each `<page>` entry
3. Parses word information such as:
   - Word (title)
   - Parts of speech (POS)
   - Definitions
   - IPA pronunciation
   - Synonyms
   - Translations
4. Filters clean dictionary entries
5. Outputs structured NDJSON files

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wiktionary-parser.git
cd wiktionary-parser