const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

app.get("/", (req, res) => {
  return res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is live on Port ${PORT}`);
});
