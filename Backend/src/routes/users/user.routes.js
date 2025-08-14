//import statements
const express = require("express");
const { registerUserController, myProfileController, loginUserController,} = require("../../controllers/user/user.controller");
const {registerValidation, loginValidation} = require("../../validators/user/user.validation");

const { emailOTPVerficationController, sendPhoneOTPVerficationController, verifyPhoneOTPController,} = require("../../controllers/user/otpVerification.controller");
const { Authentication, setHeaderDevelopment } = require("../../middlewares/auth.middleware");

const UserRoutes = express.Router();

//user routes
UserRoutes.route("/register").post( registerValidation, registerUserController);
UserRoutes.route("/login").post(loginValidation, loginUserController);

UserRoutes.route("/my-profile").get(Authentication, myProfileController);


// OTP verification routes
//UserRoutes.route("/verify-email").get( setHeaderDevelopment, Authentication, emailOTPVerficationController);
UserRoutes.route("/send-otp-phone").post(Authentication, sendPhoneOTPVerficationController);
UserRoutes.route("/verify-phone-otp").post(Authentication, verifyPhoneOTPController);

module.exports = UserRoutes;
