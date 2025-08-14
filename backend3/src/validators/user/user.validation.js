const { celebrate, Joi } = require("celebrate");
// const passwordComplexity = require("joi-password-complexity");

// register schema
const registerUserValidation = celebrate({
  body: Joi.object({
    firstName: Joi.string().required().trim().min(3).max(30).label("firstName"),
    lastName: Joi.string().required().label("lastName"),
    email: Joi.string().email().required().label("email"),
    gender: Joi.string()
      .valid("male", "female", "other")
      .required()
      .label("gender"),
    phoneNumber: Joi.string()
      .pattern(/^(\+971|0)?5[024568][0-9]{7}$/)
      .required()
      .label("phoneNumber"),
    password: Joi.string()
      .min(8)
      .max(30)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
      .required()
      .label("password")
      .messages({
        "string.pattern.base": `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
      }),
    confirmPassword: Joi.string()
      .min(8)
      .max(30)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
      .required()
      .label("confirmPassword")
      .messages({
        "string.pattern.base": `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
      }),
  })
    .required()
    .label("body"),
});

const verifyRegisterUserOTPValidation = celebrate({
  body: Joi.object({
    otp: Joi.string()
      .length(4) // assuming OTP is 4 digits
      .pattern(/^\d+$/) // only digits
      .required()
      .trim()
      .label("OTP"),
  })
    .required()
    .label("body"),
});

module.exports = {
  registerUserValidation,
  verifyRegisterUserOTPValidation,
};
