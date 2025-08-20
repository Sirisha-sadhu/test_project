const express = require("express");
const UserRoutes = require("./users/user.routes");
const OtpRoutes = require("./users/otp.routes");
const kycRouter = require("./kyc/kyc.routes");

// Route config
const ApiV1Routes = express.Router();

// ----------------------------------------
//  user  routes
// ----------------------------------------
ApiV1Routes.use("/admin", UserRoutes);


// export the routes
module.exports = ApiV1Routes;