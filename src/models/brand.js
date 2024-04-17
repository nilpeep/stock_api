"use strict";

const { mongoose } = require("../configs/dbConnection");
const { collection } = require("./user");

//? Brand Model:

const BrandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "brands",
    timestamps: true,
  }
);

module.exports = mongoose.model("Brand", BrandSchema);
