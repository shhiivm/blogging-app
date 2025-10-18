const express = require("express");
const path = require("path");
const dbconfig = require("./config/dbconfig");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
dbconfig();

const app = express();
const PORT = process.env.PORT || 8000;

// JWT auth middleware
const authMiddleware = require("./middlewares/auth"); // the fixed JWT middleware

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware); // <--- set res.locals.user for all routes

// Routes
app.use("/", require("./routes/user"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is live on Port ${PORT}`);
});
