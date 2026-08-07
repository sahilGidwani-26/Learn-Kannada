const Groq = require("groq-sdk");
const fs = require("fs");

let groqClient = null;
const getClient = () => {
  if (!groqClient) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing. Add it to your .env file.");
    }
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
};

/**
 * Generic chat completion call to Groq (Llama model).
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {boolean} jsonMode - if true, asks the model to only return JSON
 */
const chatCompletion = async (systemPrompt, userPrompt, jsonMode = false, maxTokens = 2048) => {
  const client = getClient();

  const completion = await client.chat.completions.create({
    model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.4,
    max_tokens: maxTokens,
    ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
  });

  return completion.choices[0]?.message?.content || "";
};

/**
 * Speech-to-text: transcribes a recorded audio file (Hindi or English speech) to text
 * using Groq's Whisper model. Whisper auto-detects the spoken language.
 * @param {string} audioFilePath - path to the recorded audio file on disk
 */
const transcribeAudio = async (audioFilePath) => {
  const client = getClient();

  const transcription = await client.audio.transcriptions.create({
    file: fs.createReadStream(audioFilePath),
    model: "whisper-large-v3",
    response_format: "verbose_json", // includes detected "language"
  });

  return {
    text: transcription.text || "",
    language: transcription.language || "unknown",
  };
};

module.exports = { chatCompletion, transcribeAudio };