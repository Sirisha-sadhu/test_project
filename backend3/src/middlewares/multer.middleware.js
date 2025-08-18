const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { IS_S3_UPLOAD } = require("../config/index.config");
const path = require("path");

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

// for storing images

let storage = null;

if (IS_S3_UPLOAD) {
  storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileType = file.mimetype.split("/")[1];
      const filename = uuidv4() + "." + fileType;
      cb(null, filename);
    },
  });
} else {
  storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileType = file.mimetype.split("/")[1];
      const filename = uuidv4() + "." + fileType;
      cb(null, filename);
    },
    destination(req, file, cb) {
      let filePath = path.join(__dirname, "../../public/images");
      console.log(filePath);
      cb(null, filePath);
    },
  });
}

// filter only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new multer.MulterError("EXPECT_IMAGE_ONLY", "Only images are allowed"),
      false
    );
  }
};

const limits = {
  fileSize: MAX_IMAGE_SIZE,
};

const passportUploadsMulter = multer({ storage, limits, fileFilter }).array(
  "passportDocuments"
);

const emiratesUploadsMulter = multer({ storage, limits, fileFilter }).array(
  "emiratedDocuments"
);

const kycUploadsMulter = multer({ storage, limits, fileFilter }).fields([
  { name: "passportFront", maxCount: 1 },
  { name: "passportBack", maxCount: 1 },
  { name: "emiratesFront", maxCount: 1 },
  { name: "emiratesBack", maxCount: 1 },
]);

module.exports = {
  passportUploadsMulter,
  emiratesUploadsMulter,
  kycUploadsMulter,
};
