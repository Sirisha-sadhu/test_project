const express = require("express");
const {
  Authentication,
  CheckUserVerified,
  CompletelyUserVerified,
} = require("../../middlewares/auth.middleware");
const {
  submitKycController,
  myKycDetailsController,
} = require("../../controllers/kyc/kyc.controller");
const { kycUploadsMulter } = require("../../middlewares/multer.middleware");

const KycRoutes = express.Router();

KycRoutes.route("/submit-documents").post(
  Authentication,
  CheckUserVerified,
  kycUploadsMulter,
  submitKycController
);
KycRoutes.route("/kyc-details").get(
  Authentication,
  CompletelyUserVerified,
  myKycDetailsController
);

module.exports = KycRoutes;
