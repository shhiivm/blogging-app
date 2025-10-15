const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    profileImageURL: {
      type: String,
      default: "../public/images/default.svg",
    },
    role:{
      type:String,
      enum:["USER", "ADMIN"],
      default:"USER"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
