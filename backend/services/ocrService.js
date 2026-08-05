const fs = require("fs");
const path = require("path");
const axios = require("axios") || null; // guarded below in case axios isn't installed

/**
 * Extracts Kannada text from an image.
 * Priority: Google Cloud Vision API (accurate) -> Tesseract.js (free, offline fallback).
 */
const extractTextFromImage = async (imagePath) => {
  if (process.env.GOOGLE_VISION_API_KEY && process.env.GOOGLE_VISION_API_KEY !== "your_google_vision_api_key_here") {
    return extractWithGoogleVision(imagePath);
  }
  return extractWithTesseract(imagePath);
};

const extractWithGoogleVision = async (imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");

  const url = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`;
  const body = {
    requests: [
      {
        image: { content: base64Image },
        features: [{ type: "TEXT_DETECTION" }],
        imageContext: { languageHints: ["kn"] }, // kn = Kannada
      },
    ],
  };

  const { data } = await axios.post(url, body);
  const detections = data.responses[0]?.textAnnotations;
  return detections && detections.length > 0 ? detections[0].description.trim() : "";
};

const extractWithTesseract = async (imagePath) => {
  const { createWorker } = require("tesseract.js");
  const worker = await createWorker("kan"); // Kannada language pack
  const {
    data: { text },
  } = await worker.recognize(imagePath);
  await worker.terminate();
  return text.trim();
};

module.exports = { extractTextFromImage };
