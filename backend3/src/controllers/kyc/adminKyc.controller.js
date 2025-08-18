const httpErrors = require("http-errors");

const userModel = require("../../schema/user.model");
const kycModel = require("../../schema/kyc.model");

const logger = require("../../config/logger.config");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const sortConstants = require("../../constants/sort.constants");

const kycListAdminController = async (req, res, next) => {
  try {
    logger.info(
      "controller - kyc - adminKyc.controller - kycListAdminController - start"
    );

    let { limit = 15, page = 1, sort = "-createdAt" } = req.query;
    const { kycStatus } = req.query;
    const query = {};

    if (kycStatus) query.kycStatus = kycStatus;

    limit = Number(limit);
    page = Number(page);

    const skip_docs = (page - 1) * limit;

    const totalDocs = await kycModel.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);

    const docs = await kycModel
      .find(query)
      .skip(skip_docs)
      .limit(limit)
      .sort(sortConstants[sort] || sortConstants["-createdAt"]);

    const hasNext = totalDocs > skip_docs + limit;
    const hasPrev = page > 1;

    const data = {
      totalDocs,
      totalPages,
      docs,
      currentPage: page,
      hasNext,
      hasPrev,
      limit,
    };

    logger.info(
      "controller - kyc - adminKyc.controller - kycListAdminController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: "Successfully kyc list fetched",
      data,
    });
  } catch (error) {
    logger.error(
      "controller - kyc - adminKyc.controller - kycListAdminController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const kycDetailsAdminController = async (req, res, next) => {
  try {
    logger.info(
      "controller - kyc - adminKyc.controller - kycDetailsAdminController - start"
    );
    const { kycId } = req.params;
    const details = await kycModel.findById(kycId).lean();
    if (!details) return next(httpErrors.NotFound("kyc details not found"));

    responseHandlerUtil.successResponseStandard(res, {
      message: "Successfully fetched kyc details",
      data: details,
    });

    logger.info(
      "controller - kyc - adminKyc.controller - kycDetailsAdminController - start"
    );
  } catch (error) {
    logger.error(
      "controller - kyc - adminKyc.controller - kycDetailsAdminController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  kycListAdminController,
  kycDetailsAdminController,
};
