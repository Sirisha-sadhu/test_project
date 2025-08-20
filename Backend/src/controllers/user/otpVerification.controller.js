const httpErrors = require("http-errors");

//models 
const userModel = require("../../schema/user.model");
const otpModel = require("../../schema/otp.model");
const USER_CONSTANTS = require("../../constants/user.constants");

//config
const logger = require("../../config/logger.config");

//utils
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { generateOTP, sendOTPPhone } = require("../../utils/otpGenerator.util");

//aws mail service
const AwsMailServiceClass = require("../../aws/mails/mail.ses");
const NodeMailerServiceClass = require('../../aws/mails/mail.nodemailer')
const { otp } = require("../../constants/model.constants");


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
    const otp = generateOTP();

    if (isOtpExist && isOtpExist.count >= 8) { 
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
          otp,
          $inc: { count: 1 },
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        },
        { new: true }
      );
    } else {
      otpDetails = new otpModel({
        user: req.user._id,
        email: req.user.email,
        otp,
        type: "email",
      });
      await otpDetails.save();
    }

    console.log(req.user)

    //const awsMailServiceClass = new AwsMailServiceClass();
    const nodeMailerServiceClass = new NodeMailerServiceClass()
    let mailDetails = {
      user_name: req.user.firstName,
      user_email: otpDetails.email,
      otp: otp
    };

    await nodeMailerServiceClass.sendMail(otpDetails.email, "welcomeRegistrationTemplate", null, mailDetails);

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
    const user = await userModel.findByIdAndUpdate(req.user._id, { emailVerified: true }, {new: true});

    logger.info(
      "controller - users - otpVerfication.controller - verifyRegisterUserEmailOTPController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      success: true,
      message: " Email is verified successfully.",
      data: user
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
    
    if (req.user.isPhoneVerified) {
      return responseHandlerUtil.successResponseStandard(res, {
        message: "Phone number is already verified.",
      });
    }

    const isOtpExist = await otpModel
      .findOne({  user: req.user._id, type: 'phone' })
      .lean();
    
    let otpDetail = null;
    const otp = generateOTP();  

    if (isOtpExist && isOtpExist.count >= 8) {
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
      
      otpDetail = await otpModel.findByIdAndUpdate(
        isOtpExist._id,
        {
          otp,
          $inc: { count: 1 },
          expiresAt: new Date(Date.now() + 5 * 60 * 1000), //5 minutes
        },
        { new: true }
      );
    } else {  
      otpDetail = new otpModel({
        user: req.user._id,
        phoneNumber: req.user.countryCode + " " + req.user.phoneNumber ,
        otp,
        type: 'phone',
      });
      await otpDetail.save();
    }


    await sendOTPPhone(otpDetail.phoneNumber, otp);

    logger.info(
      "controller - users - otpVerfication.controller - phoneOTPVerficationController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
          message: 'otp sent successfully to the phone number',
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
    }).lean();


    if (!otpDetails || otpDetails.expiresAt < new Date()) {
      return next(httpErrors. NotFound("OTP has expired or is invalid. Please request a new one."));
    }

    if (otpDetails.limitCompleted) {
      return next(
        httpErrors.TooManyRequests(
          "Too many attempts. Please try again after 24 hours."
        )
      );
    }

    if (otpDetails.verifyAttempts >= 3) {
      return next(
        httpErrors.TooManyRequests(
          "Maximum OTP verification attempts exceeded. Request a new OTP."
        )
      );
    }
    // Check if OTP matches
    if (otpDetails.otp !== otp) {
      await otpModel.findByIdAndUpdate(otpDetails._id, {
        $inc: { verifyAttempts: 1 },
      });
      return next(httpErrors.BadRequest("Invalid OTP."));
    }
    await otpModel.findByIdAndDelete(otpDetails._id);
    const user = await userModel.findByIdAndUpdate(req.user._id, { phoneVerified: true }, {new: true});


     logger.info(
      "controller - users - otpVerfication.controller - verifyPhoneOTPController - end"
    );

    // OTP is valid, proceed with further actions
    responseHandlerUtil.successResponseStandard(res, {
      success:true,
      message: "Phone Number is verified successfully",
      data: user
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
