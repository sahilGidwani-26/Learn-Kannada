const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { translateText, askTeacher, getTeacherHistory } = require("../controllers/aiController");

router.post("/translate", protect, translateText);
router.post("/teacher", protect, askTeacher);
router.get("/teacher/history", protect, getTeacherHistory);

module.exports = router;
