const mongoose = require("mongoose");
const { user, otp, kyc } = require("../constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
    emirates: {
      fileName: {
        type: String,
      },
      url: {
        type: String,
      },
      size: {
        type: String,
      },
    },
    passportFront: {
      fileName: {
        type: String,
      },
      url: {
        type: String,
      },
      size: {
        type: String,
      },
    },
    passportBack: {
      fileName: {
        type: String,
      },
      url: {
        type: String,
      },
      size: {
        type: String,
      },
    },
    residenceAddress: {
      fileName: {
        type: String,
      },
      url: {
        type: String,
      },
      size: {
        type: String,
      },
    },
    kycStatus: {
      type: String,
      enum: ["not-submitted", "pending", "approved", "rejected"],
      default: "not-submitted",
    },

    rejectionReason: {
      type: String,
      default: null,
    },
    verifiedAt: {
      type: Date,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    passportLast: {},
  },
  { timestamps: true }
);

const kycModel = mongoose.model(kyc, ModelSchema);

module.exports = kycModel;
