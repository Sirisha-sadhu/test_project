const dotenv = require("dotenv");
//   env load
dotenv.config();

module.exports = {
  SERVER_PORT: process.env.PORT || 8001,
  DEVELOPMENT_MODE: process.env.DEVELOPMENT_MODE || "development",
  DEVELOPMENT_ACCESS_USER_TOKEN:
    process.env.DEVELOPMENT_ACCESS_USER_TOKEN || null,

  // mongodb
  DEVELOPMENT_MONGODB_URL: process.env.DB_URL_DEV,
  PRODUCTION_MONGODB_URL: process.env.DB_URL,

  // token keys
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_KEY_TIME: process.env.ACCESS_TOKEN_KEY_TIME,

  // cors
  CORS_ALLOW_ORIGINS: process.env.ALLOW_ORIGINS_ACCESS || "[]",

  // Aws SES credentials
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_SES_SENDER: process.env.AWS_SES_SENDER,

  IS_S3_UPLOAD: process.env.IS_S3_UPLOAD === "true" ? true : false,
};
