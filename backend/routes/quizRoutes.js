const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { submitQuiz, getQuizHistory, getLevelQuestions, submitLevel, checkVoiceAnswer } = require("../controllers/quizController");

router.post("/submit", protect, submitQuiz);
router.get("/history", protect, getQuizHistory);
router.get("/level/:level", protect, getLevelQuestions);
router.post("/level/:level/submit", protect, submitLevel);
router.post("/voice-answer", protect, upload.uploadAudio.single("audio"), checkVoiceAnswer);

module.exports = router;