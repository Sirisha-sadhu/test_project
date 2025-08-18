const httpErrors = require("http-errors");
const userModel = require("../../../../backend3/src/schema/user.model");
const USER_CONSTANTS = require("../../../../backend3/src/constants/user.constants");
const logger = require("../../../../backend3/src/config/logger.config");
const { verifyPasswordMethod } = require("../../../../backend3/src/utils/verifyPassword.util");
const { createAccessToken } = require("../../../../backend3/src/utils/jwtToken.util");
const errorHandling = require("../../../../backend3/src/utils/errorHandling.util");
const responseHandlerUtil = require("../../../../backend3/src/utils/responseHandler.util");

const submitKycController = async (req, res, next) => {
  try {
    logger.info(
      "controller - kyc - kyc.controller - submitKycController - start"
    );
    const details = await userModel.findById(req.user._id).lean();

    logger.info(
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
  submitKycController
};
