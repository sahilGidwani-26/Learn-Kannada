const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { extractTextPerPage, renderAllPagesToImages } = require("../services/pdfService");
const { extractTextFromImage } = require("../services/ocrService");
const { chatCompletion } = require("../services/groqService");
const { buildPdfPageFullTranslatePrompt } = require("../prompts/translatePrompt");
const History = require("../models/History");

const MAX_PAGES = 105;

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

    const needsOcr = pages.some((p) => !p || !p.trim());
    if (needsOcr) {
      console.log("[PDF] Some pages have no text layer - rendering pages to images for OCR fallback");
      renderedImagePaths = await renderAllPagesToImages(pdfPath);
    }

    const results = [];

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
          hindi: "",
          english: "",
          message: "No readable text could be found on this page.",
        });
        continue;
      }

      const { system, user } = buildPdfPageFullTranslatePrompt(pageText);
      // Full-page translations need more room than short answers - raise the token limit.
      const raw = await chatCompletion(system, user, true, 4096);

      let pageData;
      try {
        pageData = JSON.parse(raw);
      } catch {
        pageData = { originalText: pageText, hindi: "", english: "", raw };
      }

      results.push({ page: i + 1, ...pageData });
    }

    await History.create({
      user: req.user._id,
      type: "scan",
      originalText: `PDF (${numPages} pages): ${req.file.originalname}`,
      translatedText: "",
      explanation: `Translated ${results.length} page(s)`,
    });

    res.json({ success: true, data: { fileName: req.file.originalname, numPages, results } });
  } finally {
    fs.unlink(pdfPath, () => {});
    renderedImagePaths.forEach((p) => fs.unlink(p, () => {}));
  }
});


const KANNADA_FONT_PATH = path.join(__dirname, "..", "fonts", "NotoSansKannada-Regular.ttf");
const DEVANAGARI_FONT_PATH = path.join(__dirname, "..", "fonts", "NotoSansDevanagari-Regular.ttf");


const generateTranslatedPdf = asyncHandler(async (req, res) => {
  const { fileName, results } = req.body;

  if (!results || !Array.isArray(results) || results.length === 0) {
    res.status(400);
    throw new Error("No page results provided");
  }

  const hasKannadaFont = fs.existsSync(KANNADA_FONT_PATH);
  const hasDevanagariFont = fs.existsSync(DEVANAGARI_FONT_PATH);

  const doc = new PDFDocument({ margin: 50 });
  const chunks = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  const donePromise = new Promise((resolve) => doc.on("end", () => resolve(Buffer.concat(chunks))));

  if (hasKannadaFont) doc.registerFont("Kannada", KANNADA_FONT_PATH);
  if (hasDevanagariFont) doc.registerFont("Devanagari", DEVANAGARI_FONT_PATH);

  doc.font("Helvetica-Bold").fontSize(18).text(fileName || "Translated Document", { align: "center" });
  doc.moveDown();

  results.forEach((page, idx) => {
    if (idx > 0) doc.addPage();

    doc.font("Helvetica-Bold").fontSize(14).fillColor("black").text(`Page ${page.page}`, { underline: true });
    doc.moveDown(0.5);

    doc.font("Helvetica-Bold").fontSize(11).fillColor("#555").text("Original (Kannada):");
    doc.font(hasKannadaFont ? "Kannada" : "Helvetica").fontSize(11).fillColor("black").text(page.originalText || "-");
    doc.moveDown(0.5);

    doc.font("Helvetica-Bold").fontSize(11).fillColor("#555").text("English:");
    doc.font("Helvetica").fontSize(11).fillColor("black").text(page.english || "-");
    doc.moveDown(0.5);

    doc.font("Helvetica-Bold").fontSize(11).fillColor("#555").text("Hindi:");
    doc.font(hasDevanagariFont ? "Devanagari" : "Helvetica").fontSize(11).fillColor("black").text(page.hindi || "-");
    doc.moveDown();
  });

  doc.end();
  const pdfBuffer = await donePromise;
  const base64 = pdfBuffer.toString("base64");

  const outputName = `${(fileName || "translated").replace(/\.pdf$/i, "")}-translated.pdf`;
  res.json({ success: true, data: { pdfBase64: base64, fileName: outputName } });
});

module.exports = { scanPdf, generateTranslatedPdf };