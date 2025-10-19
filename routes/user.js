const express = require("express");
const {
  homePageUserController,
  createSignupUserController,
  createSigninUserController,
  getSigninUserController,
  getSignupUserController,
  logoutUserController,
  profileUserController,
  addBlogController,
  getBlogPageController,
} = require("../controllers/userController");
const isLoggedIn = require("../middlewares/auth");
const router = express.Router();

//Get user
router.get("/", homePageUserController);
router.get("/signin", getSigninUserController);
router.get("/signup", getSignupUserController);
router.get("/logout", logoutUserController);
router.get("/profile", isLoggedIn, profileUserController);
router.get("/addblog", getBlogPageController);

//Post Users
router.post("/signup", createSignupUserController);
router.post("/signin", createSigninUserController);
router.post("/addblog", addBlogController);

module.exports = router;
