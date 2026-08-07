const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");
const { chatCompletion, transcribeAudio } = require("../services/groqService");
const { buildTranslatePrompt, buildToKannadaPrompt } = require("../prompts/translatePrompt");
const { buildTeacherPrompt } = require("../prompts/teacherPrompt");
const AIChat = require("../models/AIChat");

// @desc   Translate raw Kannada/Hindi/English text (typed, not scanned)
// @route  POST /api/ai/translate
const translateText = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please provide text to translate");
  }

  const { system, user } = buildTranslatePrompt(text);
  const raw = await chatCompletion(system, user, true);

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    data = { originalText: text, raw };
  }

  res.json({ success: true, data });
});

// @desc   Ask the AI Teacher a question
// @route  POST /api/ai/teacher
const askTeacher = asyncHandler(async (req, res) => {
  const { question } = req.body;
  if (!question) {
    res.status(400);
    throw new Error("Please provide a question");
  }

  const ageGroup = req.user?.ageGroup || "adult";
  const { system, user } = buildTeacherPrompt(question, ageGroup);
  const answer = await chatCompletion(system, user, false);

  await AIChat.create({ user: req.user._id, question, answer });

  res.json({ success: true, data: { question, answer } });
});

// @desc   Get past AI Teacher chats for the user
// @route  GET /api/ai/teacher/history
const getTeacherHistory = asyncHandler(async (req, res) => {
  const chats = await AIChat.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, data: chats });
});

// @desc   Voice Translator: listens to recorded Hindi/English speech (word or
//         sentence), transcribes it, and translates it into Kannada
// @route  POST /api/ai/voice-translate
const voiceTranslate = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an audio file");
  }

  const audioPath = req.file.path;

  try {
    console.log("[Voice] Transcribing audio:", audioPath);
    const { text: spokenText, language } = await transcribeAudio(audioPath);
    console.log("[Voice] Transcribed:", spokenText, "| detected language:", language);

    if (!spokenText.trim()) {
      return res.json({
        success: true,
        data: { detectedInput: "", kannada: "", kannadaPronunciation: "", message: "Couldn't hear anything clearly. Please try again." },
      });
    }

    const { system, user } = buildToKannadaPrompt(spokenText);
    const raw = await chatCompletion(system, user, true);

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { detectedInput: spokenText, kannada: "", kannadaPronunciation: "", raw };
    }

    res.json({ success: true, data: { ...data, spokenLanguage: language } });
  } finally {
    fs.unlink(audioPath, () => {});
  }
});

module.exports = { translateText, askTeacher, getTeacherHistory, voiceTranslate };