const httpErrors = require("http-errors");

const userModel = require("../../schema/user.model");
const kycModel = require("../../schema/kyc.model");

const logger = require("../../config/logger.config");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { IS_S3_UPLOAD } = require("../../config/index.config");

const submitKycController = async (req, res, next) => {
  try {
    logger.info(
      "controller - kyc - kyc.controller - submitKycController - start"
    );

    const isKycExist = await kycModel.findOne({ user: req.user._id });

    if (isKycExist) {
      return next(httpErrors.BadRequest("Already KYC Documents are uploaded"));
    }

    const { passportFront, passportBack, emiratesFront, emiratesBack } =
      req.files;

    const filePath = IS_S3_UPLOAD ? "" : "http://localhost:8000/public/images/";

    const kycDetails = new kycModel({
      user: req?.user?._id,
      emiratesIdFront: {
        fileName: emiratesFront?.[0]?.originalname,
        url: filePath + emiratesFront?.[0]?.filename,
        fileType: emiratesFront?.[0]?.mimetype,
        size: emiratesFront?.[0]?.size,
      },
      emiratesIdBack: {
        fileName: emiratesBack?.[0]?.originalname,
        url: filePath + emiratesBack?.[0]?.filename,
        fileType: emiratesBack?.[0]?.mimetype,
        size: emiratesBack?.[0]?.size,
      },
      passportFront: {
        fileName: passportFront?.[0]?.originalname,
        url: filePath + passportFront?.[0]?.filename,
        fileType: passportFront?.[0]?.mimetype,
        size: passportFront?.[0]?.size,
      },
      passportBack: {
        fileName: passportBack?.[0]?.originalname,
        url: filePath + passportBack?.[0]?.filename,
        fileType: passportBack?.[0]?.mimetype,
        size: passportBack?.[0]?.size,
      },
      kycStatus: "pending",
    });

    await kycDetails.save();
    const userDetails = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $set: { isKycDocsUploaded: true },
      },
      { new: true }
    );

    logger.info(
      "controller - kyc - kyc.controller - submitKycController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully kyc documents are submitted",
      data: kycDetails,
      otherData: { userDetails },
    });
  } catch (error) {
    logger.error(
      "controller - kyc - kyc.controller - submitKycController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const myKycDetailsController = async (req, res, next) => {
  try {
    logger.info(
      "controller - kyc - kyc.controller - myKycDetailsController - start"
    );

    const kycDetails = await kycModel.findOne({ user: req.user._id });

    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully kyc details are fetched",
      data: kycDetails,
    });

    logger.info(
      "controller - kyc - kyc.controller - myKycDetailsController - end"
    );
  } catch (error) {
    logger.error(
      "controller - kyc - kyc.controller - myKycDetailsController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  submitKycController,
  myKycDetailsController,
};
