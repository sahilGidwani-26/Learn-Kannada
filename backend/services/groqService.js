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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generic chat completion call to Groq (Llama model).
 * Automatically retries with a backoff delay if Groq's rate limit (429) is hit -
 * this happens on the free tier when processing many PDF pages back-to-back.
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {boolean} jsonMode - if true, asks the model to only return JSON
 * @param {number} maxTokens
 * @param {number} retriesLeft - internal, used for recursive retries
 */
const chatCompletion = async (systemPrompt, userPrompt, jsonMode = false, maxTokens = 2048, retriesLeft = 3) => {
  const client = getClient();

  try {
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
  } catch (err) {
    const status = err?.status || err?.response?.status;

    if (status === 429 && retriesLeft > 0) {
      // Try to read the "try again in X.Xs" hint Groq includes in the error message,
      // otherwise fall back to a fixed wait.
      const match = /try again in ([\d.]+)s/i.exec(err?.message || "");
      const suggestedWaitMs = match ? Math.ceil(parseFloat(match[1]) * 1000) : 15000;
      const waitMs = suggestedWaitMs + 2000; // small safety buffer

      console.log(`[Groq] Rate limited - waiting ${Math.round(waitMs / 1000)}s before retry (${retriesLeft} left)`);
      await sleep(waitMs);
      return chatCompletion(systemPrompt, userPrompt, jsonMode, maxTokens, retriesLeft - 1);
    }

    throw err;
  }
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