"use strict";

const { mongoose } = require("../configs/dbConnection");

// Category model:

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

module.exports = mongoose.model("Category", CategorySchema);
