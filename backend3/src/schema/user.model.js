const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { user } = require("../constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    isKycVerified: {
      type: Boolean,
      default: false,
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
    token: {
      type: String,
      default: null,
      select: false,
    },
  },
  { timestamps: true }
);

ModelSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const userModel = mongoose.model(user, ModelSchema);

module.exports = userModel;
