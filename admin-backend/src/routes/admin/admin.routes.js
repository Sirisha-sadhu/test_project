const express = require("express");
const { adminLoginController } = require("../../controllers/adminController");


const adminRoutes = express.Router();

// Admin login route
adminRoutes.route("/login").post(adminLoginController);

module.exports = adminRoutes;