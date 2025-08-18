const express = require("express");
const {
  Authentication,
  Authorization,
} = require("../../middlewares/auth.middleware");

const { rolesConstants } = require("../../constants/index.constants");
const {
  adminKycListController,
} = require("../../controllers/kyc/adminKyc.controller");

const AdminKycRoutes = express.Router();

AdminKycRoutes.route("/kyc-list").get(
  Authentication,
  Authorization(rolesConstants.ADMIN),
  adminKycListController
);

module.exports = AdminKycRoutes;
