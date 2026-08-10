const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");
const { extractTextPerPage, renderAllPagesToImages } = require("../services/pdfService");
const { extractTextFromImage } = require("../services/ocrService");
const { chatCompletion } = require("../services/groqService");
const { buildPdfPageSummaryPrompt } = require("../prompts/translatePrompt");
const History = require("../models/History");

const MAX_PAGES = 15;

// @desc   Upload a PDF (up to 15 pages), get a per-page summary translated into
//         Hindi and English. Pages with a real text layer are read directly;
//         pages that are just scanned/photographed images automatically fall
//         back to OCR (same engine used by the Camera Scan feature).
// @route  POST /api/pdf/scan
const scanPdf = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload a PDF file");
  }

  const pdfPath = req.file.path;
  let renderedImagePaths = [];

  try {
    console.log("[PDF] Extracting text from:", pdfPath);
    const { numPages, pages } = await extractTextPerPage(pdfPath);
    console.log("[PDF] Pages found:", numPages);

    if (numPages > MAX_PAGES) {
      res.status(400);
      throw new Error(`This PDF has ${numPages} pages. Please upload a PDF with ${MAX_PAGES} pages or fewer.`);
    }

    // If any page came back with no embedded text, it's likely a scanned/photographed
    // page - render every page to an image once, so we can OCR just the ones that need it.
    const needsOcr = pages.some((p) => !p || !p.trim());
    if (needsOcr) {
      console.log("[PDF] Some pages have no text layer - rendering pages to images for OCR fallback");
      renderedImagePaths = await renderAllPagesToImages(pdfPath);
    }

    const results = [];

    // Processed sequentially (not in parallel) to stay well within OCR/Groq rate limits
    // when a PDF has many pages.
    for (let i = 0; i < pages.length; i++) {
      let pageText = pages[i];

      if (!pageText || !pageText.trim()) {
        const imagePath = renderedImagePaths[i];
        if (imagePath) {
          console.log(`[PDF] Page ${i + 1} has no text layer - running OCR`);
          try {
            pageText = await extractTextFromImage(imagePath);
          } catch (ocrErr) {
            console.log(`[PDF] OCR failed on page ${i + 1}:`, ocrErr.message);
          }
        }
      }

      if (!pageText || !pageText.trim()) {
        results.push({
          page: i + 1,
          originalText: "",
          summary: "",
          hindi: "",
          english: "",
          message: "No readable text could be found on this page.",
        });
        continue;
      }

      const { system, user } = buildPdfPageSummaryPrompt(pageText);
      const raw = await chatCompletion(system, user, true);

      let pageData;
      try {
        pageData = JSON.parse(raw);
      } catch {
        pageData = { originalText: pageText, summary: "", hindi: "", english: "", raw };
      }

      results.push({ page: i + 1, ...pageData });
    }

    await History.create({
      user: req.user._id,
      type: "scan",
      originalText: `PDF (${numPages} pages): ${req.file.originalname}`,
      translatedText: "",
      explanation: `Summarized ${results.length} page(s)`,
    });

    res.json({ success: true, data: { fileName: req.file.originalname, numPages, results } });
  } finally {
    fs.unlink(pdfPath, () => {});
    renderedImagePaths.forEach((p) => fs.unlink(p, () => {}));
  }
});

module.exports = { scanPdf };