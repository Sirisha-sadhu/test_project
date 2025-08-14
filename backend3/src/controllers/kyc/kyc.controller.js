const httpErrors = require("http-errors");
const userModel = require("../../schema/user.model");
const kycModel = require("../../schema/kyc.model");

const logger = require("../../config/logger.config");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");

const submitKycController = async (req, res, next) => {
  try {
    logger.info(
      "controller - kyc - kyc.controller - submitKycController - start"
    );
    const isKycExist = await logger.info(
      "controller - kyc - kyc.controller - submitKycController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully user details fetched",
      data: details,
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
  submitKycController,
};
