const express = require("express");

// const OtpRoutes = require("./users/otp.routes");
// const kycRouter = require("./kyc/kyc.routes");
const adminRoutes = require("./admin/admin.routes");

// Route config
const ApiV1Routes = express.Router();

// ----------------------------------------
//  admin  routes
// ----------------------------------------
ApiV1Routes.use("/admin", adminRoutes);


// export the routes
module.exports = ApiV1Routes;