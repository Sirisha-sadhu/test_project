const express = require("express");

const {
  registerUserValidation,
  loginUserValidation,
  usersListAdminValidation,
} = require("../../validators/user/user.validation");
const {
  Authentication,
  Authorization,
} = require("../../middlewares/auth.middleware");
const {
  registerAdminUserController,
  myProfileAdminController,
  loginUserAdminController,
  usersListAdminController,
} = require("../../controllers/user/adminUser.controller");
const { rolesConstants } = require("../../constants/index.constants");

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

AdminUserRoutes.route("/users-list").get(
  Authentication,
  Authorization(rolesConstants.ADMIN),
  usersListAdminValidation,
  usersListAdminController
);

module.exports = AdminUserRoutes;
