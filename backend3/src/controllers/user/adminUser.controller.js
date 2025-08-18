const httpErrors = require("http-errors");
const userModel = require("../../schema/user.model");
const USER_CONSTANTS = require("../../constants/user.constants");
const logger = require("../../config/logger.config");
const { verifyPasswordMethod } = require("../../utils/verifyPassword.util");
const { createAccessToken } = require("../../utils/jwtToken.util");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const { rolesConstants } = require("../../constants/index.constants");

const registerAdminUserController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - adminUser.controller - registerAdminUserController - start"
    );

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      phoneNumber,
    } = req.body;

    // if passwords or not same
    if (password !== confirmPassword)
      return next(httpErrors.BadRequest(USER_CONSTANTS.CONFIRM_PASSWORD_SAME));

    let userExist = await userModel.findOne({ email });

    // if user exists
    if (userExist)
      return next(httpErrors.BadRequest(USER_CONSTANTS.USER_ALREADY_EXISTS));

    const newUserDetails = new userModel({
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      isEmailVerified: true,
      isPhoneVerified: true,
      role: rolesConstants.ADMIN,
    });

    const token = await createAccessToken(
      newUserDetails?._id.toString(),
      newUserDetails.role
    );

    newUserDetails.token = token;
    await newUserDetails.save();

    const leanUserDetails = newUserDetails.toObject();
    delete leanUserDetails.password;
    delete leanUserDetails.token;

    logger.info(
      "controller - users - adminUser.controller - registerAdminUserController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      success: true,
      statusCode: 201,
      message: USER_CONSTANTS.SUCCESSFULLY_USER_CREATED,
      data: leanUserDetails,
      otherData: { token },
    });
  } catch (error) {
    logger.error(
      "controller - users - adminUser.controller - registerAdminUserController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const myProfileAdminController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - adminUser.controller - myProfileAdminController - start"
    );
    const details = await userModel.findById(req.user._id).lean();

    logger.info(
      "controller - users - adminUser.controller - myProfileAdminController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully user details fetched",
      data: details,
    });
  } catch (error) {
    logger.error(
      "controller - users - adminUser.controller - myProfileAdminController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const loginUserAdminController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - adminUser.controller - loginUserAdminController - start"
    );

    const { email, password } = req.body;

    let userExist = await userModel
      .findOne({ email, role: rolesConstants.ADMIN })
      .select("+password");

    // if user exists
    if (!userExist)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    const isPasspwordMatch = await verifyPasswordMethod(
      password,
      userExist.password
    );
    if (!isPasspwordMatch)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    const token = await createAccessToken(
      userExist?._id.toString(),
      userExist.role
    );

    userExist.token = token;
    await userExist.save();

    const leanUserDetails = userExist.toObject();
    delete leanUserDetails.password;
    delete leanUserDetails.token;

    logger.info(
      "controller - users - adminUser.controller - loginUserAdminController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      message: USER_CONSTANTS.SUCCESSFULLY_USER_LOGIN,
      data: leanUserDetails,
      otherData: { token },
    });
  } catch (error) {
    logger.error(
      "controller - users - adminUser.controller - loginUserAdminController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  registerAdminUserController,
  myProfileAdminController,
  loginUserAdminController,
};
