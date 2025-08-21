const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { user, kyc } = require("../constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    dob:{
      type: Date,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minimum: 8,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isKycVerified: {
      type: Boolean,
      default: false,
    },
    kycDocsUploaded: {
      type: mongoose.Schema.Types.ObjectId,
      ref: kyc,
      required: true,
    },
    token: {
      type: String,
      default: null,
      select: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model(user, ModelSchema);

module.exports = userModel;
