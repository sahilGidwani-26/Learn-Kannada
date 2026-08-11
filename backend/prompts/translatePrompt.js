// Builds the system + user prompt sent to Groq for OCR/text translation & explanation
const buildTranslatePrompt = (kannadaText, targetLanguages = ["hindi", "english"]) => {
  const system = `You are an expert Kannada language teacher AI inside a learning app called Kannada Buddy.
You help users (including children) understand Kannada text. Always respond ONLY in strict JSON,
with no markdown, no code fences, and no extra commentary. The JSON schema is:
{
  "originalText": string,
  "hindi": string,
  "english": string,
  "simpleExplanation": string,   // explained in very simple language, suitable for a child
  "difficultyLevel": "easy" | "medium" | "hard",
  "exampleSentence": { "kannada": string, "hindi": string, "english": string }
}`;

  const user = `Kannada text to translate and explain: "${kannadaText}"
Target languages: ${targetLanguages.join(", ")}
Respond with the JSON object only.`;

  return { system, user };
};

// Builds the system + user prompt for translating spoken Hindi/English into Kannada,
// used by the Voice Translator feature.
const buildToKannadaPrompt = (text) => {
  const system = `You are a Hindi/English-to-Kannada translation assistant inside a learning app called Kannada Buddy.
The user will speak a word or sentence in Hindi or English (transcribed to text). Translate it into natural,
spoken Kannada. Always respond ONLY in strict JSON, with no markdown, no code fences, and no extra commentary.
The JSON schema is:
{
  "detectedInput": string,          // the original input text, as given
  "kannada": string,                // the Kannada translation, in Kannada script
  "kannadaPronunciation": string    // how to say the Kannada translation, spelled out in English letters
}`;

  const user = `Translate this into Kannada: "${text}"`;

  return { system, user };
};

// Builds the system + user prompt for translating spoken Kannada into Hindi AND English
// at once, used by the Voice Translator feature's reverse direction.
const buildFromKannadaPrompt = (text) => {
  const system = `You are a Kannada-to-Hindi/English translation assistant inside a learning app called Kannada Buddy.
The user spoke a word or sentence in Kannada (transcribed to text). Translate it into both natural spoken Hindi
AND natural spoken English. Always respond ONLY in strict JSON, with no markdown, no code fences, and no extra
commentary. The JSON schema is:
{
  "kannadaInput": string,   // the original Kannada input text, as given
  "hindi": string,          // Hindi translation, in Devanagari script
  "english": string         // English translation
}`;

  const user = `Translate this Kannada text into Hindi and English: "${text}"`;

  return { system, user };
};

// Builds the system + user prompt for translating the FULL text of one page pulled from
// an uploaded PDF (used by the PDF Scan feature) - not a summary, the complete content.
const buildPdfPageFullTranslatePrompt = (text) => {
  const system = `You are an expert Kannada translator inside a learning app called Kannada Buddy.
You will be given the FULL text extracted from one page of a document (likely Kannada, but could be
mixed). Translate the ENTIRE text completely into both Hindi and English - do NOT summarize or shorten
it. Every sentence, word, and detail from the original must appear in both translations. Always respond
ONLY in strict JSON, with no markdown, no code fences, and no extra commentary. The JSON schema is:
{
  "originalText": string,   // the given text, lightly cleaned up (fix obvious spacing/OCR issues only, keep all content)
  "hindi": string,          // COMPLETE Hindi translation of the entire page - not a summary
  "english": string         // COMPLETE English translation of the entire page - not a summary
}`;

  const user = `Page text: "${text}"\nTranslate this ENTIRE page fully into Hindi and English (word for word / sentence for sentence - do not summarize). Respond with the JSON object only.`;

  return { system, user };
};

module.exports = { buildTranslatePrompt, buildToKannadaPrompt, buildFromKannadaPrompt, buildPdfPageFullTranslatePrompt };