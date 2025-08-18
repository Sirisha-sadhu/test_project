const express = require("express");
const {
  Authentication,
  CheckUserVerified,
} = require("../../middlewares/auth.middleware");
const { submitKycController } = require("../../controllers/kyc/kyc.controller");
const { kycUploadsMulter } = require("../../middlewares/multer.middleware");

const KycRoutes = express.Router();

KycRoutes.route("/submit-documents").post(
  Authentication,
  CheckUserVerified,
  kycUploadsMulter,
  submitKycController
);

module.exports = KycRoutes;
