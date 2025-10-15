const mongoose = require("mongoose");

const dbconfig = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/blog-app-1610");
  } catch (error) {
    console.error("DB connection fail", error);
  }
};

module.exports = dbconfig;
