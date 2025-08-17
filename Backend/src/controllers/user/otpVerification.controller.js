const httpErrors = require("http-errors");

//models 
const userModel = require("../../schema/user.model");
const otpModel = require("../../schema/otp.model");
const USER_CONSTANTS = require("../../constants/user.constants");

//config
const logger = require("../../config/logger.config");

// const { verifyPasswordMethod } = require("../../utils/verifyPassword.util");
// const { createAccessToken } = require("../../utils/jwtToken.util");

//utils
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { generateOTP, sendOTPPhone } = require("../../utils/otpGenerator.util");

//aws mail service
const AwsMailServiceClass = require("../../aws/mails/mail.ses");


const sendEmailOTPVerficationController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - otpVerfication.controller - sendOTPVerficationController - start"
    );

    if (req.user.isEmailVerified) {
      return responseHandlerUtil.successResponseStandard(res, {
        message: "already user email is verified",
      });
    }

    const isOtpExist = await otpModel
      .findOne({
        user: req.user._id,
        type: "email",
      })
      .lean();
    let otpDetails = null;

    if (isOtpExist && isOtpExist.count >= 3) {
      if (!isOtpExist?.limitCompleted) {
        await otpModel.findByIdAndUpdate(isOtpExist._id, {
          limitCompleted: true,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), //24 hours
        });
      }

      return next(
        httpErrors.TooManyRequests(
          "Too many attempts. Please try again after 24 hours."
        )
      );
    } else if (isOtpExist) {
      const otp = generateOTP();
      otpDetails = await otpModel.findByIdAndUpdate(
        isOtpExist._id,
        {
          otp,
          $inc: { count: 1 },
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        },
        { new: true }
      );
    } else {
      const otp = generateOTP();
      otpDetails = new otpModel({
        user: req.user._id,
        email: req.user.email,
        otp,
        type: "email",
      });
      await otpDetails.save();
    }

    const awsMailServiceClass = new AwsMailServiceClass();
    let mailDetails = {
      user_name: otpDetails.name,
      user_email: otpDetails.email,
    };

    logger.info(
      "controller - users - otpVerfication.controller - sendRegisterUserEmailOTPController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "otp send successfully on the given mail",
    });

  } catch (error) {
    logger.error(
      "controller - users - otpVerfication.controller - sendOTPVerficationController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const verifyEmailOTPController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - otpVerfication.controller - verifyRegisterUserEmailOTPController - start"
    );

    const { otp } = req.body;

    const isOtpExist = await otpModel
      .findOne({ user: req.user._id, type: "email" })
      .lean();

    if (!isOtpExist || isOtpExist.expiresAt < new Date())
      return next(
        httpErrors.NotFound("OTP has expired. Please request a new one.")
      );

    if (isOtpExist.limitCompleted) {
      return next(
        httpErrors.TooManyRequests(
          "Too many attempts. Please try again after 24 hours."
        )
      );
    }

    if (isOtpExist.verifyAttempts >= 3) {
      return next(
        httpErrors.TooManyRequests(
          "Maximum OTP verification attempts exceeded. request a new otp"
        )
      );
    }

    // Check if OTP matches
    if (isOtpExist.otp !== otp) {
      await otpModel.findByIdAndUpdate(isOtpExist._id, {
        $inc: { verifyAttempts: 1 },
      });
      return next(httpErrors.BadRequest("Invalid OTP."));
    }

    await otpModel.findByIdAndDelete(isOtpExist._id);
    await userModel.findByIdAndUpdate(req.user._id, { isEmailVerified: true });

    logger.info(
      "controller - users - otpVerfication.controller - verifyRegisterUserEmailOTPController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "OTP verified successfully.",
    });
  } catch (error) {
    logger.error(
      "controller - users - otpVerfication.controller - verifyRegisterUserEmailOTPController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

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
  sendEmailOTPVerficationController,
  verifyEmailOTPController,
  sendPhoneOTPVerficationController,
  verifyPhoneOTPController,
};
