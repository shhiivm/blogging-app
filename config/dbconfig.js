const mongoose = require("mongoose");
require("dotenv").config("../.env");

const dbconfig = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("mongoDB connected");
  } catch (error) {
    console.error("DB connection fail", error);
  }
};

module.exports = dbconfig;
