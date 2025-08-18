const express = require("express");

const {
  registerUserValidation,
  loginUserValidation,
} = require("../../validators/user/user.validation");
const { Authentication } = require("../../middlewares/auth.middleware");
const {
  registerAdminUserController,
} = require("../../controllers/user/adminUser.controller");

const AdminUserRoutes = express.Router();

AdminUserRoutes.route("/register").post(
  registerUserValidation,
  registerAdminUserController
);

module.exports = AdminUserRoutes;
