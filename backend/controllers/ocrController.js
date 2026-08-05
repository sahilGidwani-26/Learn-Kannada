const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");
const { extractTextFromImage } = require("../services/ocrService");
const { chatCompletion } = require("../services/groqService");
const { buildTranslatePrompt } = require("../prompts/translatePrompt");
const History = require("../models/History");

// @desc   Scan an uploaded image, OCR + AI translate + explain
// @route  POST /api/ocr/scan
const scanImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an image file");
  }

  const imagePath = req.file.path;

  try {
    console.log("[OCR] Starting text extraction for:", imagePath);
    const extractedText = await extractTextFromImage(imagePath);
    console.log("[OCR] Extracted text:", extractedText);

    if (!extractedText) {
      return res.json({
        success: true,
        data: { originalText: "", message: "No text detected in the image. Try a clearer photo." },
      });
    }

    const { system, user } = buildTranslatePrompt(extractedText);
    const aiResponseRaw = await chatCompletion(system, user, true);

    let aiResponse;
    try {
      aiResponse = JSON.parse(aiResponseRaw);
    } catch {
      aiResponse = { originalText: extractedText, note: "AI response could not be parsed as JSON", raw: aiResponseRaw };
    }

    await History.create({
      user: req.user._id,
      type: "scan",
      originalText: extractedText,
      translatedText: aiResponse.english || "",
      explanation: aiResponse.simpleExplanation || "",
    });

    res.json({ success: true, data: aiResponse });
  } finally {
    // Clean up uploaded file after processing
    fs.unlink(imagePath, () => {});
  }
});

module.exports = { scanImage };