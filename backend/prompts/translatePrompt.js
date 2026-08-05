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

module.exports = { buildTranslatePrompt };
