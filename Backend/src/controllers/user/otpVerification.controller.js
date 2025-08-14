const httpErrors = require("http-errors");
const userModel = require("../../schema/user.model");
const USER_CONSTANTS = require("../../constants/user.constants");
const logger = require("../../config/logger.config");
const { verifyPasswordMethod } = require("../../utils/verifyPassword.util");
const { createAccessToken } = require("../../utils/jwtToken.util");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { generateOTP } = require("../../utils/otpGenerator.util");
const otpModel = require("../../schema/otp.model");

const sendOTPVerficationController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - otpVerfication.controller - sendOTPVerficationController - start"
    );

    const otp = generateOTP();
    const otpDetails = new otpModel({
      user: req.user._id,
      email: req.user.email,
      otp,
    });

    await otpDetails.save();

    logger.info(
      "controller - users - otpVerfication.controller - sendOTPVerficationController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "otp send successfully",
      data: otpDetails,
    });
  } catch (error) {
    logger.error(
      "controller - users - otpVerfication.controller - sendOTPVerficationController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  sendOTPVerficationController,
};
