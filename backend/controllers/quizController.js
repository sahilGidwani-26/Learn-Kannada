const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");
const QuizAttempt = require("../models/Quiz");
const User = require("../models/User");
const { generateLevelQuestions, getLevelType, mapToQuizAttemptType } = require("../utils/quizGenerator");
const { transcribeAudio } = require("../services/groqService");


const submitQuiz = asyncHandler(async (req, res) => {
  const { quizType, totalQuestions, correctAnswers } = req.body;

  if (!quizType || totalQuestions == null || correctAnswers == null) {
    res.status(400);
    throw new Error("quizType, totalQuestions and correctAnswers are required");
  }

  const accuracyPct = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
  const xpEarned = Math.round(correctAnswers * 10 * (1 + accuracyPct));
  const coinsEarned = Math.round(correctAnswers * 2);

  const attempt = await QuizAttempt.create({
    user: req.user._id,
    quizType,
    totalQuestions,
    correctAnswers,
    xpEarned,
    coinsEarned,
  });

  const user = await User.findById(req.user._id);
  user.xp += xpEarned;
  user.coins += coinsEarned;
  user.level = Math.floor(user.xp / 500) + 1;
  await user.save();

  res.status(201).json({
    success: true,
    data: attempt,
    rewards: { xpEarned, coinsEarned, totalXp: user.xp, totalCoins: user.coins, level: user.level },
  });
});


const getQuizHistory = asyncHandler(async (req, res) => {
  const attempts = await QuizAttempt.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, data: attempts });
});


const getLevelQuestions = asyncHandler(async (req, res) => {
  const level = Math.max(1, Math.min(100, parseInt(req.params.level, 10) || 1));
  const data = await generateLevelQuestions(level);
  res.json({ success: true, data });
});


const submitLevel = asyncHandler(async (req, res) => {
  const level = Math.max(1, Math.min(100, parseInt(req.params.level, 10) || 1));
  const { totalQuestions, correctAnswers } = req.body;

  if (totalQuestions == null || correctAnswers == null) {
    res.status(400);
    throw new Error("totalQuestions and correctAnswers are required");
  }

  const accuracyPct = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
  const passed = accuracyPct >= 0.7;

  const xpEarned = Math.round(correctAnswers * 10 * (1 + accuracyPct));
  const coinsEarned = Math.round(correctAnswers * 2);

  await QuizAttempt.create({
    user: req.user._id,
    quizType: mapToQuizAttemptType(getLevelType(level)),
    totalQuestions,
    correctAnswers,
    xpEarned,
    coinsEarned,
  });

  const user = await User.findById(req.user._id);
  user.xp += xpEarned;
  user.coins += coinsEarned;
  user.level = Math.floor(user.xp / 500) + 1;

  let leveledUp = false;
  const currentQuizLevel = user.quizLevel || 1;
  if (passed && level >= currentQuizLevel && level < 100) {
    user.quizLevel = level + 1;
    leveledUp = true;
  } else if (!user.quizLevel) {
    user.quizLevel = 1;
  }
  await user.save();

  res.json({
    success: true,
    data: { passed, leveledUp, accuracyPct, quizLevel: user.quizLevel },
    rewards: { xpEarned, coinsEarned, totalXp: user.xp, totalCoins: user.coins, level: user.level },
  });
});

// @desc   Check a spoken (voice) answer against the expected Kannada word, used by
//         the voice-only levels (91-100)
// @route  POST /api/quiz/voice-answer
const checkVoiceAnswer = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an audio file");
  }

  const { expectedAnswer } = req.body;
  const audioPath = req.file.path;

  try {
    const { text } = await transcribeAudio(audioPath);

    const normalize = (s) =>
      (s || "")
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, "");

    const spoken = normalize(text);
    const expected = normalize(expectedAnswer);
    const isCorrect = spoken.length > 0 && expected.length > 0 && (spoken === expected || spoken.includes(expected) || expected.includes(spoken));

    res.json({ success: true, data: { transcribed: text, isCorrect } });
  } finally {
    fs.unlink(audioPath, () => {});
  }
});

module.exports = { submitQuiz, getQuizHistory, getLevelQuestions, submitLevel, checkVoiceAnswer };