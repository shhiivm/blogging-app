const express = require("express");
const {
  createSignupUserController,
  createSigninUserController,
  getSigninUserController,
  getSignupUserController,
} = require("../controllers/userController");

const router = express.Router();

//Get user
router.get("/signin", getSigninUserController);
router.get("/signup", getSignupUserController);

//Post Users

router.post("/signup", createSignupUserController);
router.post("/signin", createSigninUserController);

module.exports = router;
