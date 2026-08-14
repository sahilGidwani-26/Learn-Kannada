const multer = require("multer");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = isProduction
      ? "/tmp"
      : path.join(__dirname, "..", "uploads");

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed"), false);
  }
};

const audioFileFilter = (req, file, cb) => {
  const allowed = [
    "audio/m4a",
    "audio/mp4",
    "audio/x-m4a",
    "audio/mpeg",
    "audio/wav",
    "audio/webm",
    "audio/3gpp",
  ];

  if (allowed.includes(file.mimetype) || file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed"), false);
  }
};

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

const uploadAudio = multer({
  storage,
  fileFilter: audioFileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});

const uploadPdf = multer({
  storage,
  fileFilter: pdfFileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

module.exports = upload;
module.exports.uploadAudio = uploadAudio;
module.exports.uploadPdf = uploadPdf;