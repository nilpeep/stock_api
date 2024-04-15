"use strict";

//TODO: Created a user model according to ERD

// DATA SAMPLE: [
//     {
//         "username": "admin",
//         "password": "aA*123456",
//         "email": "admin@site.com",
//         "firstName": "admin",
//         "lastName": "admin",
//         "isActive": true,
//         "isStaff": true,
//         "isAdmin": true
//     }
//     {
//         "username": "staff",
//         "password": "aA*123456",
//         "email": "staff@site.com",
//         "firstName": "staff",
//         "lastName": "staff",
//         "isActive": true,
//         "isStaff": true,
//         "isAdmin": false
//     }
//     {
//         "username": "test",
//         "password": "aA*123456",
//         "email": "test@site.com",
//         "firstName": "test",
//         "lastName": "test",
//         "isActive": true,
//         "isStaff": false,
//         "isAdmin": false
//     }
// ]

const { mongoose } = require("../configs/dbConnection");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
  },
  {
    collection: "users",
    timestamps: true,
  }
);

// Exports:

module.exports = mongoose.model("User", userSchema);
