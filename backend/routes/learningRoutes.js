const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAlphabets,
  getAlphabetById,
  getNumbers,
  getWordsByCategory,
  getAllWordCategories,
  updateProgress,
  getUserProgress,
} = require("../controllers/learningController");

router.get("/alphabets", getAlphabets);
router.get("/alphabets/:id", getAlphabetById);
router.get("/numbers", getNumbers);
router.get("/words/categories", getAllWordCategories);
router.get("/words/:category", getWordsByCategory);

router.post("/progress", protect, updateProgress);
router.get("/progress", protect, getUserProgress);

module.exports = router;
