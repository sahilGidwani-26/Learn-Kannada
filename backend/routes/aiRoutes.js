const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { translateText, askTeacher, askTeacherVoice, getTeacherHistory, voiceTranslate } = require("../controllers/aiController");

router.post("/translate", protect, translateText);
router.post("/teacher", protect, askTeacher);
router.post("/teacher/voice", protect, upload.uploadAudio.single("audio"), askTeacherVoice);
router.get("/teacher/history", protect, getTeacherHistory);
router.post("/voice-translate", protect, upload.uploadAudio.single("audio"), voiceTranslate);

module.exports = router;