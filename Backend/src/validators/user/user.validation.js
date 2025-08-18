const { celebrate, Joi, Segments } = require('celebrate');

const registerValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        firstName: Joi.string()
            .min(3)
            .max(20)
            .required()
            .messages({
                'string.min': 'First name must be at least 4 characters long.',
                'string.max': 'First name must not exceed 20 characters.',
            }),
        lastName: Joi.string()
            .min(3)
            .max(20)
            .required()
            .messages({
                'string.min': 'Last name must be at least 4 characters long.',
                'string.max': 'Last name must not exceed 20 characters.',
            }),
        password: Joi.string()
            .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,15}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must be 8-15 characters, include at least one uppercase letter and one special character.',
            }),
        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.only': 'Confirm password must match the password.',
                'any.required': 'Confirm password is required.'
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.pattern.base': 'Email must be valid and end with a dot followed by 2 or 3 letters.',
            }),
        countryCode: Joi.string()
            .pattern(/^\+[1-9]\d{0,3}$/) // e.g. +1, +91, +971
            .required()
            .messages({
                'string.pattern.base': 'Country code must be in format +<digits> (e.g. +91)',
                'any.required': 'Country code is required'
        }),
        phoneNumber: Joi.string()
            .pattern(/^[0-9]{7,15}$/) // only digits, length between 7 and 15
            .required()
            .messages({
                'string.pattern.base': 'Phone number must contain only digits and be between 7 and 15 digits long',
                'any.required': 'Phone number is required'
        }),
        dob: Joi.date()
            .iso()
            .less('now')
            .required()
            .messages({
                'date.iso': 'Date of birth must be in ISO format (YYYY-MM-DD).',
                'date.less': 'Date of birth must be in the past.'
            }),
        gender: Joi.string(),
    }),
});

const loginValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Email must be a valid email address.',
                'any.required': 'Email is required.'
            }),
        password: Joi.string()
            .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,15}$/)
            .required()
            .messages({
                'any.required': 'Password is required.'
            }),
    }),
});

const verifyOTPValidation = celebrate({
  body: Joi.object({
    otp: Joi.string()
      .length(6) // assuming OTP is 4 digits
      .pattern(/^\d+$/) // only digits
      .required()
      .trim()
      .label("OTP"),
  })
    .required()
    .label("body"),
});

module.exports = {
    registerValidation,
    loginValidation,
    verifyOTPValidation
};