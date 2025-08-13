//import statements
const express = require("express");
const { registerUser, myProfile,} = require("../../controllers/user/user.controller");
const {registerUserValidation,} = require("../../validators/user/user.validation");
const {Authentication, setHeaderDevelopment,} = require("../../middlewares/auth.middleware");
const { sendOTPVerficationController,} = require("../../controllers/user/otpVerification.controller");

const UserRoutes = express.Router();

//user routes
UserRoutes.route("/register").post( registerUserValidation, registerUser);

UserRoutes.route("/my-profile").get(Authentication, myProfile);

UserRoutes.route("/send-otp").get( setHeaderDevelopment, Authentication, sendOTPVerficationController);

module.exports = UserRoutes;
