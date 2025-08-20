const httpErrors = require("http-errors");
const userModel = require('../schema/user.model')
const ADMIN_CONSTANTS = require('../constants/admin.constants');
const logger = require("../config/logger.config");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/jwtToken.util");
const errorHandling = require("../utils/errorHandling.util");
const responseHandlerUtil = require("../utils/responseHandler.util");

const adminLoginController = async (req, res, next) => {
  try {
    logger.info("controller - admin - admin.controller - adminLoginController - start");
    const { email, password } = req.body;
    // Find admin by email
    const admin = await userModel.findOne({ email }).select("+password");
    if (!admin)
      return next(httpErrors.BadRequest(ADMIN_CONSTANTS.ADMIN_NOT_FOUND));

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return next(httpErrors.BadRequest(ADMIN_CONSTANTS.INVALID_PASSWORD));
    }

    // Generate JWT token
    const token = await createAccessToken(
      admin?._id.toString(),
      admin.role
    );

    responseHandlerUtil.successResponseStandard(res, {
      success: true,
      statusCode: 200,
      message: ADMIN_CONSTANTS.SUCCESSFULLY_ADMIN_LOGIN,
      otherData: { token },
    });
    logger.info("controller - admin - admin.controller - adminLoginController - end");
  } catch (error) {
    logger.error("controller - admin - admin.controller - adminLoginController - error", error);
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  adminLoginController,
};