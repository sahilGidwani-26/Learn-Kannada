const asyncHandler = require("../utils/asyncHandler");
const QuizAttempt = require("../models/Quiz");
const User = require("../models/User");

// @desc   Submit a completed quiz attempt, award XP/coins
// @route  POST /api/quiz/submit
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
  user.level = Math.floor(user.xp / 500) + 1; // simple leveling curve, tune as needed
  await user.save();

  res.status(201).json({
    success: true,
    data: attempt,
    rewards: { xpEarned, coinsEarned, totalXp: user.xp, totalCoins: user.coins, level: user.level },
  });
});

// @desc   Get quiz history for the logged-in user
// @route  GET /api/quiz/history
const getQuizHistory = asyncHandler(async (req, res) => {
  const attempts = await QuizAttempt.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, data: attempts });
});

module.exports = { submitQuiz, getQuizHistory };
