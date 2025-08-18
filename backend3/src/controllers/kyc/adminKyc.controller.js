const httpErrors = require("http-errors");

const userModel = require("../../schema/user.model");
const kycModel = require("../../schema/kyc.model");

const logger = require("../../config/logger.config");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");

const adminKycListController = async (req, res, next) => {
  try {
    logger.info(
      "controller - kyc - adminKyc.controller - adminKycListController - start"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully kyc list are fetched",
    });

    logger.info(
      "controller - kyc - adminKyc.controller - adminKycListController - end"
    );
  } catch (error) {
    logger.error(
      "controller - kyc - adminKyc.controller - adminKycListController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  adminKycListController,
};
