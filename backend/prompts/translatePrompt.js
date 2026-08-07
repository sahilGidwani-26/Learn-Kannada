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

module.exports = { buildTranslatePrompt, buildToKannadaPrompt };