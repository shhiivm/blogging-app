const express = require("express");
const path = require("path");
const dbconfig = require("./config/dbconfig");

dbconfig();

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use("/", require("./routes/user"));

app.listen(PORT, () => {
  console.log(`Server is live on Port ${PORT}`);
});
