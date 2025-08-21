const httpErrors = require("http-errors");

// models0
const userModel = require("../../schema/user.model");
const kycModel = require("../../schema/kyc.model");

const logger = require("../../config/logger.config");

const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { AWS_S3_UPLOAD } = require("../../config/index.config");
const cloudinary = require("cloudinary");
const { default: uploadFilesToCloudinary } = require("../../utils/uploadCloudinary");

const submitKycController = async (req, res, next) => {
  try {
    logger.info(
      "controller - kyc - kyc.controller - submitKycController - start"
    );

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

    const myCloud = await uploadFilesToCloudinary(req.files);


    const buildFileData = (file) => {
      if (!file) return null;
      return {
        public_id: file.public_id,
        format: file.format,
        url: file.secure_url,
        name: file.original_filename
      };  
    };

    const newKyc = new kycModel({
      user: req.user._id,
      emirates: buildFileData(myCloud?.emirates),
      passportFront: buildFileData(myCloud?.passportFront),
      passportBack: buildFileData(myCloud?.passportBack),
      kycStatus: "pending"
    });
    newKyc.save();

    const user = await userModel.findByIdAndUpdate( req.user._id,{ isKycDocsUploaded: true });

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
