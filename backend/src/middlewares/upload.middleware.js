const multer = require("multer");

// Use memory storage so file is stored in memory as Buffer for direct streaming to ImageKit
const storage = multer.memoryStorage();

// Allowed image MIME types
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Validate file type
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, JPG, PNG, and WEBP image formats are supported."
      ),
      false
    );
  }
};

// 5MB max file size
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1, // Only 1 image allowed
  },
  fileFilter,
});

/**
 * Middleware to handle single image upload under field 'image'.
 * Formats Multer and file validation errors into clean 400 JSON responses.
 */
const uploadFoodImage = (req, res, next) => {
  const singleUpload = upload.single("image");

  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "Image file too large. Maximum allowed size is 5MB.",
        });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          message: "Unexpected field name. The image field must be named 'image'.",
        });
      }
      return res.status(400).json({
        message: `File upload error: ${err.message}`,
      });
    } else if (err) {
      return res.status(400).json({
        message: err.message || "Invalid image file uploaded.",
      });
    }

    next();
  });
};

module.exports = {
  uploadFoodImage,
  ALLOWED_MIME_TYPES,
};
