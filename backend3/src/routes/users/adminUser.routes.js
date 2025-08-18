const express = require("express");

const {
  registerUserValidation,
  loginUserValidation,
} = require("../../validators/user/user.validation");
const { Authentication } = require("../../middlewares/auth.middleware");
const {
  registerAdminUserController,
  myProfileAdminController,
  loginUserAdminController,
} = require("../../controllers/user/adminUser.controller");

const AdminUserRoutes = express.Router();

AdminUserRoutes.route("/login").post(
  loginUserValidation,
  loginUserAdminController
);

AdminUserRoutes.route("/register").post(
  registerUserValidation,
  registerAdminUserController
);

AdminUserRoutes.route("/my-profile").get(
  Authentication,
  myProfileAdminController
);

module.exports = AdminUserRoutes;
