const express = require("express");
const path = require("path");
const dbconfig = require("./config/dbconfig");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config("./.env");
dbconfig();

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", require("./routes/user"));

app.listen(PORT, () => {
  console.log(`Server is live on Port ${PORT}`);
});
