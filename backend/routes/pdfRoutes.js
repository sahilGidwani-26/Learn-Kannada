const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { scanPdf, generateTranslatedPdf } = require("../controllers/pdfController");

router.post("/scan", protect, upload.uploadPdf.single("pdf"), scanPdf);
router.post("/generate", protect, generateTranslatedPdf);

module.exports = router;