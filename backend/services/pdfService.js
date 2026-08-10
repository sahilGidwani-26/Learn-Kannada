const fs = require("fs");
const path = require("path");
const os = require("os");
const pdfParse = require("pdf-parse");
// pdf-to-img is an ESM-only package (uses top-level await internally), so it can't be
// loaded with a normal require() from this CommonJS file - it must be dynamically
// imported inside an async function instead (see renderAllPagesToImages below).

/**
 * Extracts text from a PDF, page by page, using pdf-parse's custom page-render hook.
 * NOTE: this reads the PDF's embedded text layer (works for PDFs created digitally,
 * e.g. exported from Word or typed documents). It does NOT run OCR on scanned/photographed
 * pages - a PDF made purely of page images will come back with empty text per page.
 * @param {string} pdfPath - path to the PDF file on disk
 * @returns {{ numPages: number, pages: string[] }}
 */
const extractTextPerPage = async (pdfPath) => {
  const pages = [];
  const buffer = fs.readFileSync(pdfPath);

  const options = {
    pagerender: (pageData) => {
      return pageData.getTextContent().then((textContent) => {
        const text = textContent.items.map((item) => item.str).join(" ");
        pages.push(text.trim());
        return text;
      });
    },
  };

  const data = await pdfParse(buffer, options);
  return { numPages: data.numpages, pages };
};

/**
 * Renders every page of a PDF to a PNG image on disk. Used as a fallback for pages
 * that have no embedded text layer - i.e. pages that are really just a photo/scan of a
 * book page. Uses pdf-to-img, which is pure JS and needs no native binaries
 * (no ImageMagick/Poppler installation required).
 * @param {string} pdfPath - path to the PDF file on disk
 * @returns {string[]} array of temp image file paths, one per page, in page order
 */
async function renderAllPagesToImages(pdfPath) {
  const { pdf } = await import("pdf-to-img");

  const imagePaths = [];
  const document = await pdf(pdfPath, { scale: 2 });

  let index = 0;
  for await (const imageBuffer of document) {
    index++;
    const tempPath = path.join(os.tmpdir(), `pdf-page-${Date.now()}-${index}.png`);
    fs.writeFileSync(tempPath, imageBuffer);
    imagePaths.push(tempPath);
  }

  return imagePaths;
}

module.exports = { extractTextPerPage, renderAllPagesToImages };