const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

const {
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_S3_UPLOAD, // ✅ import this too
} = require("../config/index.config");

// 🔹 AWS S3 client
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

// 🔹 Decide storage based on config
let storage;
if (!AWS_S3_UPLOAD) {
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../public/kyc"));
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname); // .jpg or .pdf
      const baseName = path.basename(file.originalname, ext);
      const fileName = `${baseName}-${uuidv4()}${file.originalname}`;
      cb(null, fileName);
    },
  });
} else {
  storage = multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const fileName = `${baseName}-${uuidv4()}${ext}`;
      cb(null, `kyc/${fileName}`);
    },
  });
}

// 🔹 Allow images & pdfs
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs are allowed!"), false);
  }
};

// 🔹 Multer middleware for KYC
const kycUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).fields([
  { name: "passportFront", maxCount: 1 },
  { name: "passportBack", maxCount: 1 },
  { name: "emirates", maxCount: 1 },
]);

module.exports = { kycUpload };
