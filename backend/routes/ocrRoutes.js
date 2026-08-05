const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { scanImage } = require("../controllers/ocrController");

router.post("/scan", protect, upload.single("image"), scanImage);

module.exports = router;
