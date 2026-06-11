const fs = require("fs");
const readline = require("readline");


const rl = readline.createInterface({
    input: fs.createReadStream("./data/filter/dictionary.ndjson", {
        encoding: "utf8",
    }),
    crlfDelay: Infinity,
});

const output = fs.createWriteStream(
    "./data/filter/dictionary(main).ndjson",
    { flags: "w" } // নতুন ফাইল
);

function extractWords(text) {
    const regex = /\{\{(?:t|tt)(?:-check|-needed)?\+?\|[^|]+\|([^|}]+)/g;

    const words = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        words.push(match[1].trim());
    }

    return [...new Set(words)];
}

rl.on("line", (line) => {
    let doc;

    try {
        doc = JSON.parse(line);
    } catch {
        return;
    }

    if (!doc.translations || typeof doc.translations !== "object") {
        return;
    }

    const translations = {};

    for (const [lang, value] of Object.entries(doc.translations)) {
        if (typeof value !== "string") continue;

        const words = extractWords(value);

        if (words.length) {
            translations[lang.replace(/^\*\s*/, "")] = words;
        }
    }

    if (Object.keys(translations).length) {
        const data = JSON.stringify(
            {
                word: doc.word,
                pos: doc.pos,
                definitions: doc.definitions,
                ipa: doc.ipa,
                synonyms: doc.synonyms,
                translations,
            },
        )
        console.log(doc.word , "written");
        
        output.write(data + "\n")
    }
});

rl.on("close", () => {
    output.end()
    console.log("All word written done");
});