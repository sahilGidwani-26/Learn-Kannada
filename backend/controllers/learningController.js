const asyncHandler = require("../utils/asyncHandler");
const Alphabet = require("../models/Alphabet");
const NumberItem = require("../models/NumberItem");
const Word = require("../models/Word");
const Progress = require("../models/Progress");

// ---------- Alphabets ----------
const getAlphabets = asyncHandler(async (req, res) => {
  const { type } = req.query; // vowel | consonant
  const filter = type ? { type } : {};
  const alphabets = await Alphabet.find(filter).sort({ order: 1 });
  res.json({ success: true, count: alphabets.length, data: alphabets });
});

const getAlphabetById = asyncHandler(async (req, res) => {
  const alphabet = await Alphabet.findById(req.params.id);
  if (!alphabet) {
    res.status(404);
    throw new Error("Alphabet not found");
  }
  res.json({ success: true, data: alphabet });
});

// ---------- Numbers ----------
const getNumbers = asyncHandler(async (req, res) => {
  const { from = 0, to = 100 } = req.query;
  const numbers = await NumberItem.find({
    value: { $gte: Number(from), $lte: Number(to) },
  }).sort({ value: 1 });
  res.json({ success: true, count: numbers.length, data: numbers });
});

// ---------- Words ----------
const getWordsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const words = await Word.find({ category });
  res.json({ success: true, count: words.length, data: words });
});

const getAllWordCategories = asyncHandler(async (req, res) => {
  const categories = await Word.distinct("category");
  res.json({ success: true, data: categories });
});

// ---------- Progress ----------
const updateProgress = asyncHandler(async (req, res) => {
  const { module, itemId, completed, accuracy } = req.body;

  const progress = await Progress.findOneAndUpdate(
    { user: req.user._id, module, itemId },
    {
      $set: { completed: !!completed, accuracy: accuracy || 0, lastAttemptAt: new Date() },
      $inc: { attempts: 1 },
    },
    { new: true, upsert: true }
  );

  res.json({ success: true, data: progress });
});

const getUserProgress = asyncHandler(async (req, res) => {
  const progress = await Progress.find({ user: req.user._id });
  res.json({ success: true, data: progress });
});

module.exports = {
  getAlphabets,
  getAlphabetById,
  getNumbers,
  getWordsByCategory,
  getAllWordCategories,
  updateProgress,
  getUserProgress,
};
