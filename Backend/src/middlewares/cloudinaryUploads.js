const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
//const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uuidv4 } = require("uuid");

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Decide storage (Cloudinary will handle both images & PDFs)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const ext = file.mimetype.split("/")[1] || "bin";

    return {
      folder: "kyc",
      public_id: `${file.fieldname}-${uuidv4()}`, // unique filename
      resource_type: file.mimetype === "application/pdf" ? "raw" : "image", 
       // keeps original format
    };
  },
});

// ✅ Allow images & PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname), false);

  }
};

// ✅ Multer middleware (fields similar to S3 config)
const kycUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).fields([
  { name: "passportFront", maxCount: 1 },
  { name: "passportBack", maxCount: 1 },
  { name: "emirates", maxCount: 1 },
]);

module.exports = { kycUpload, cloudinary };


