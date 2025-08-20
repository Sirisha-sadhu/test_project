const httpErrors = require("http-errors");

// models0
const userModel = require("../../schema/user.model");
const kycModel = require("../../schema/kyc.model");

const logger = require("../../config/logger.config");

const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { AWS_S3_UPLOAD } = require("../../config/index.config");

const submitKycController = async (req, res, next) => {
  try {
    logger.info(
      "controller - kyc - kyc.controller - submitKycController - start"
    );

    console.log(req.files)

    const {passportFront, passportBack, emirates} = req.files;

    if (!passportFront || !passportBack || !emirates) {
      return next(httpErrors.BadRequest("All KYC documents are required."));
    }

    const userKyc = await kycModel.findOne({ userId: req.user._id });
    if (userKyc) {
      return next(
        httpErrors.BadRequest(
          "You have already submitted your KYC details."
        )
      );
    }

    const buildFileData = (file) => {
      if (!file) return null;
      return {
        fileName: file.originalname,
        url: file.location || file.path, // S3 -> location, Local -> path
        size: `${file.size} bytes`,
      };
    };

    const newKyc = new kycModel({
      user: req.user._id,
      emirates: buildFileData(req.files?.emirates?.[0]),
      passportFront: buildFileData(req.files?.passportFront?.[0]),
      passportBack: buildFileData(req.files?.passportBack?.[0]),
      residenceAddress: buildFileData(req.files?.residenceAddress?.[0]),
      kycStatus: "pending"
    });

    const user = await userModel.findByIdAndUpdate( req.user._id,{ isKycVerified: true, isKycDocsUploaded: true });

    logger.info(
      "controller - kyc - kyc.controller - submitKycController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully user details fetched",
      data: user,
    });
  } catch (error) {
    logger.error(
      "controller - kyc - kyc.controller - submitKycController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  submitKycController
};
