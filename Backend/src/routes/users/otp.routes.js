const express = require("express");
const {
    verifyRegisterUserOTPValidation, 
    verifyOTPValidation} = require("../../validators/user/user.validation");
const { Authentication } = require("../../middlewares/auth.middleware");
const {
  sendEmailOTPVerficationController,
  verifyEmailOTPController,
  sendPhoneOTPVerficationController,
  verifyPhoneOTPController,
} = require("../../controllers/user/otpVerification.controller");

const OtpRoutes = express.Router();


// Email OTP verification routes
OtpRoutes.route("/send-email").get(
  Authentication,
  sendEmailOTPVerficationController
);

OtpRoutes.route("/verify-email").post(
  Authentication,
  verifyOTPValidation,
  verifyEmailOTPController
);

// Phone OTP verification routes
UserRoutes.route("/send-otp-phone").post(Authentication, sendPhoneOTPVerficationController);
UserRoutes.route("/verify-phone-otp").post(Authentication, verifyPhoneOTPController);

module.exports = OtpRoutes;
