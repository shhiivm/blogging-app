const express = require("express");
const {
  homePageUserController,
  createSignupUserController,
  createSigninUserController,
  getSigninUserController,
  getSignupUserController,
  logoutUserController,
  profileUserController,
} = require("../controllers/userController");
const isLoggedIn = require("../middlewares/auth");
const router = express.Router();

//Get user
router.get("/", homePageUserController);
router.get("/signin", getSigninUserController);
router.get("/signup", getSignupUserController);
router.get("/logout", logoutUserController);
router.get("/profile", isLoggedIn, profileUserController);

//Post Users
router.post("/signup", createSignupUserController);
router.post("/signin", createSigninUserController);

module.exports = router;
