const mongoose = require("mongoose");

const workLogSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    checkIn: {
      time: Date,
      lat: Number,
      lng: Number,
    },

    checkOut: {
      time: Date,
      lat: Number,
      lng: Number,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    disputeStatus: {
      type: String,
      enum: ["none", "raised", "resolved"],
      default: "none",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WorkLog", workLogSchema);