const express = require("express");
const {
  registerUserController,
  myProfileController,
} = require("../../controllers/user/user.controller");
const {
  registerUserValidation,
} = require("../../validators/user/user.validation");
const { Authentication } = require("../../middlewares/auth.middleware");

const UserRoutes = express.Router();

UserRoutes.route("/register").post(
  registerUserValidation,
  registerUserController
);

UserRoutes.route("/my-profile").get(Authentication, myProfileController);

module.exports = UserRoutes;
// 2025-08-13T11:32:37.877+00:00
