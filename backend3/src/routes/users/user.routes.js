const express = require("express");
const {
  registerUserController,
  myProfileController,
} = require("../../controllers/user/user.controller");
const {
  registerUserValidation,
  verifyRegisterUserOTPValidation,
} = require("../../validators/user/user.validation");
const {
  Authentication,
  setHeaderDevelopment,
} = require("../../middlewares/auth.middleware");
const {
  sendRegisterUserOTPController,
  verifyRegisterUserOTPController,
} = require("../../controllers/user/otpVerification.controller");

const UserRoutes = express.Router();

UserRoutes.route("/register").post(
  registerUserValidation,
  registerUserController
);

UserRoutes.route("/my-profile").get(Authentication, myProfileController);

UserRoutes.route("/send-otp").get(
  setHeaderDevelopment,
  Authentication,
  sendRegisterUserOTPController
);

UserRoutes.route("/verify-otp").post(
  setHeaderDevelopment,
  Authentication,
  verifyRegisterUserOTPValidation,
  verifyRegisterUserOTPController
);

module.exports = UserRoutes;
// 2025-08-13T11:32:37.877+00:00
