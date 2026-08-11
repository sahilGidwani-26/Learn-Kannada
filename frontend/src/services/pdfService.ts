import api from "./api";

export interface PdfPageResult {
  page: number;
  originalText: string;
  hindi: string;
  english: string;
  message?: string;
}

export interface PdfScanResponse {
  fileName: string;
  numPages: number;
  results: PdfPageResult[];
}

export const scanPdf = async (fileUri: string, fileName: string) => {
  const formData = new FormData();
  // @ts-ignore - React Native's FormData accepts this shape for file uploads
  formData.append("pdf", { uri: fileUri, type: "application/pdf", name: fileName || "document.pdf" });

  // Up to 15 pages, each needing OCR (if scanned) + a full-page AI translation - can take
  // several minutes for longer, photo-based PDFs, so a generous timeout.
  const { data } = await api.post<{ data: PdfScanResponse }>("/pdf/scan", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 300000,
  });
  return data.data;
};

export interface GeneratePdfResponse {
  pdfBase64: string;
  fileName: string;
}

// Turns the already-fetched page results into a downloadable PDF (base64-encoded).
export const generateTranslatedPdf = async (fileName: string, results: PdfPageResult[]) => {
  const { data } = await api.post<{ data: GeneratePdfResponse }>(
    "/pdf/generate",
    { fileName, results },
    { timeout: 60000 }
  );
  return data.data;
};
