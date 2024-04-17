"use strict";

const { mongoose } = require("../configs/dbConnection");

//? Firm model:

const FirmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    phone: String,

    address: String,

    email: String,

    image: String,
  },
  {
    collection: "firms",
    timestamps: true,
  }
);

module.exports = mongoose.model("Firm", FirmSchema);
