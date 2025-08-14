const httpErrors = require("http-errors");
// model
const userModel = require("../../schema/user.model");
const otpModel = require("../../schema/otp.model");

// utils
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { generateOTP } = require("../../utils/otpGenerator.util");
// aws
const AwsMailServiceClass = require("../../aws/mails/mail.ses");
// config
const logger = require("../../config/logger.config");

const sendRegisterUserOTPController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - otpVerfication.controller - sendOTPVerficationController - start"
    );

    const isOtpExist = await otpModel.findOne({ user: req.user._id });
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
      otpDetails = await otpModel.findByIdAndUpdate(
        isOtpExist._id,
        {
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
      });
      await otpDetails.save();
    }

    const awsMailServiceClass = new AwsMailServiceClass();
    let mailDetails = {
      user_name: otpDetails.name,
      user_email: otpDetails.email,
    };

    // sending mail using aws
    // await awsMailServiceClass.sendEmail(
    //   otpDetails.email,
    //   "welcomeRegistrationTemplate",
    //   null,
    //   mailDetails
    // );

    logger.info(
      "controller - users - otpVerfication.controller - sendOTPVerficationController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "otp send successfully",
    });
  } catch (error) {
    logger.error(
      "controller - users - otpVerfication.controller - sendOTPVerficationController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const verifyRegisterUserOTPController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - otpVerfication.controller - verifyRegisterUserOTPController - start"
    );

    const { otp } = req.body;

    const isOtpExist = await otpModel.findOne({ user: req.user._id }).lean();

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
    await userModel.findByIdAndUpdate(req.user._id, { isVerified: true });

    logger.info(
      "controller - users - otpVerfication.controller - verifyRegisterUserOTPController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "OTP verified successfully.",
    });
  } catch (error) {
    logger.error(
      "controller - users - otpVerfication.controller - verifyRegisterUserOTPController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  sendRegisterUserOTPController,
  verifyRegisterUserOTPController,
};
