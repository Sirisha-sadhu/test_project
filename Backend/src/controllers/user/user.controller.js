const httpErrors = require("http-errors");
const userModel = require("../../schema/user.model");
const USER_CONSTANTS = require("../../constants/user.constants");
const logger = require("../../config/logger.config");
const { verifyPasswordMethod } = require("../../utils/verifyPassword.util");
const { createAccessToken } = require("../../utils/jwtToken.util");
const errorHandling = require("../../utils/errorHandling.util");
const responseHandlerUtil = require("../../utils/responseHandler.util");
const bcrypt = require("bcrypt");

const registerUserController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - user.controller - registerUserController - start"
    );

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
      countryCode,
      phoneNumber,
      dob
    } = req.body;

    // if passwords or not same
    if (password !== confirmPassword)
      return next(httpErrors.BadRequest(USER_CONSTANTS.CONFIRM_PASSWORD_SAME));

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);

    let userExist = await userModel.findOne({ email: email });

    // if user exists
    if (userExist)
      return next(httpErrors.BadRequest(USER_CONSTANTS.USER_ALREADY_EXISTS));



    const newUserDetails = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      phoneNumber,
      countryCode,
      dob
    });

    await newUserDetails.save();
    delete newUserDetails.password // remove password from response

    const token = await createAccessToken(
      newUserDetails?._id.toString(),
      newUserDetails.role
    );

    newUserDetails.token = token;
    await newUserDetails.save();

    logger.info(
      "controller - users - user.controller - registerUserController - end"
    );

    responseHandlerUtil.successResponseStandard(res, {
      success: true,
      statusCode: 201,
      message: USER_CONSTANTS.SUCCESSFULLY_USER_CREATED,
      data: newUserDetails,
      otherData: { token },
    });
  } catch (error) {
    logger.error(
      "controller - users - user.controller - registerUserController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const loginUserController = async (req, res, next) => {
    try {
      logger.info(
        "controller - users - user.controller - loginUserController - start"
      );
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email }).select("+password") ;
        if (!user)
          return next(httpErrors.BadRequest(USER_CONSTANTS.USER_NOT_FOUND));
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_PASSWORD));
        }

        // Generate JWT token
      const token = await createAccessToken(
          user?._id.toString(),
          user.role
        );

      responseHandlerUtil.successResponseStandard(res, {
      success: true,
      statusCode: 200,
      message: USER_CONSTANTS.SUCCESSFULLY_USER_LOGIN,
      otherData: { token },
    });
    } catch (error) {
      console.log("Error in loginUserController:", error);
        logger.error(
          "controller - users - user.controller - loginUserController - error",
          error
        );
        errorHandling.handleCustomErrorService(error, next);
    }
};


const myProfileController = async (req, res, next) => {
  try {
    logger.info(
      "controller - users - user.controller - myProfileController - start"
    );
    const details = await userModel.findById(req.user._id).lean();

    logger.info(
      "controller - users - user.controller - myProfileController - end"
    );
    responseHandlerUtil.successResponseStandard(res, {
      message: "successfully user details fetched",
      data: details,
    });
  } catch (error) {
    logger.error(
      "controller - users - user.controller - myProfileController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};


module.exports = {
  registerUserController,
  myProfileController,
  loginUserController
};
