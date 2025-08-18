const express = require("express");
const UserRoutes = require("./users/user.routes");
const OtpRoutes = require("./users/otp.routes");
const KycRoutes = require("./kyc/kyc.routes");

// Route config
const ApiV1Routes = express.Router();

// ----------------------------------------
//  user  routes
// ----------------------------------------
ApiV1Routes.use("/user", UserRoutes);
ApiV1Routes.use("/user/otp", OtpRoutes);
ApiV1Routes.use("/kyc", KycRoutes);

// export the routes
module.exports = ApiV1Routes;
