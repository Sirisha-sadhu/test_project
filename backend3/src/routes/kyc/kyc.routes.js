const express = require("express");
const {
  Authentication,
  CheckUserVerified,
} = require("../../middlewares/auth.middleware");
const { submitKycController } = require("../../controllers/kyc/kyc.controller");

const KycRoutes = express.Router();

KycRoutes.route("/submit-documents").post(
  Authentication,
  CheckUserVerified,
  submitKycController
);

module.exports = KycRoutes;
