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
OtpRoutes.route("/send-otp-phone").get(Authentication, sendPhoneOTPVerficationController);
OtpRoutes.route("/verify-otp-phone").post(Authentication,verifyOTPValidation, verifyPhoneOTPController);

module.exports = OtpRoutes;
