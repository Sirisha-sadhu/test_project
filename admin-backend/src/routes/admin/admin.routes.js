const express = require("express");
const { adminLoginController, getUserDetailsController, kycUpdateController } = require("../../controllers/adminController");
const { Authentication } = require("../../middlewares/auth.middleware");


const adminRoutes = express.Router();

// Admin login route
adminRoutes.route("/login").post(adminLoginController);
adminRoutes.route('/get-users').get(Authentication, getUserDetailsController)
adminRoutes.route('/updateKyc/:id').put(Authentication, kycUpdateController)

module.exports = adminRoutes;