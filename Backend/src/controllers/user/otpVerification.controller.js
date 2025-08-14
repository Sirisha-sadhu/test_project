const httpErrors = require("http-errors");
const userModel = require("../../schema/user.model");
const USER_CONSTANTS = require("../../constants/user.constants");
const logger = require("../../config/logger.config");
const { verifyPasswordMethod } = require("../../utils/verifyPassword.util");
const { createAccessToken } = require("../../utils/jwtToken.util");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { generateOTP, sendOTPPhone } = require("../../utils/otpGenerator.util");
const otpModel = require("../../schema/otp.model");

// const emailOTPVerficationController = async (req, res, next) => {
//   try {
//     logger.info(
//       "controller - users - otpVerfication.controller - sendOTPVerficationController - start"
//     );
//     const { email } = req.body;
//     const otp = generateOTP();
//     const otpDetails = new otpModel({
//       user: req.user._id,
//       email: req.user.email,
//       otp,
//     });

//     await otpDetails.save();

//     logger.info(
//       "controller - users - otpVerfication.controller - sendOTPVerficationController - end"
//     );

//     responseHandlerUtil.successResponseStandard(res, {
//       message: "otp send successfully",
//       data: otpDetails,
//     });
//   } catch (error) {
//     logger.error(
//       "controller - users - otpVerfication.controller - sendOTPVerficationController - error",
//       error
//     );
//     errorHandling.handleCustomErrorService(error, next);
//   }
// };

const sendPhoneOTPVerficationController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - otpVerfication.controller - sendPhoneOTPVerficationController - start"
    );
    const { phoneNumber } = req.body;

    const otp = await sendOTPPhone(phoneNumber);

    console.log("Generated OTP:", otp);

    const otpDetails = new otpModel({
      user: req.user._id,
      type: 'phone', 
      phoneNumber: phoneNumber,
      otp,
    });
    await otpDetails.save();

    logger.info(
      "controller - users - otpVerfication.controller - phoneOTPVerficationController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
          success: true,
          statusCode: 200,
          message: USER_CONSTANTS.SUCCESSFULL_OPT_SENT,
        });
  } catch (error) {
    logger.error(
      "controller - users - otpVerfication.controller - phoneOTPVerficationController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const verifyPhoneOTPController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - otpVerfication.controller - verifyPhoneOTPController - start"
    );
    const { otp } = req.body;

    const otpDetails = await otpModel.findOne({
      user: req.user._id,
      otp,
      type: 'phone',
    });

    if (!otpDetails) {
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_OTP));
    }

    if (otpDetails.expiresAt < new Date()) {
      return responseHandlerUtil.errorResponseStandard(res, {
        message: "OTP has expired",
        statusCode: 400,
      });
    }

     logger.info(
      "controller - users - otpVerfication.controller - verifyPhoneOTPController - end"
    );

    // OTP is valid, proceed with further actions
    responseHandlerUtil.successResponseStandard(res, {
      message: "OTP verified successfully",
    });

   
  }

  catch (error) {
    logger.error(
      "controller - users - otpVerfication.controller - verifyPhoneOTPController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
}
module.exports = {
  sendPhoneOTPVerficationController,
  verifyPhoneOTPController,
};
