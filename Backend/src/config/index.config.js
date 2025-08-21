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

  // aws s3 credientials
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,

  AWS_S3_UPLOAD: process.env.AWS_S3_UPLOAD == "true" ? true : false,

 // nodemailer SMPT
 NODEMAILER_HOST: process.env.SMPT_HOST,
 NODEMAILER_PORT: process.env.SMPT_PORT,
 NODEMAILER_PASS: process.env.SMPT_PASS,
 NODEMAILER_USER: process.env.SMPT_USER,
 NODEMAILER_EMAIL: process.env.SMPT_EMAIL ,

// cloudinary
 CLOUDINARY_CLOUD_NAME :process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY : process.env.CLOUDINARY_API_SECRET,
};