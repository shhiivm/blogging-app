const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Get Login User
const getSigninUserController = (req, res) => {
  // return res.render("signin");
  res.render("login");
};
//Get SignUp User
const getSignupUserController = (req, res) => {
  return res.render("signup");
};
//Home Page
const homePageUserController = async (req, res) => {
  return res.render("home", {
    user: req.user,
  });
};
//Logout
const logoutUserController = async (req, res) => {
  res.clearCookie("token");
  return res.redirect("/signin");
};

//Profile
const profileUserController = async (req, res) => {
  return res.render("profile");
};

//Post Signin User
const createSigninUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send("Email and Password required");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).render("login", {
        error: "Incorrect email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });
      return res.status(200).render("profile");
    }
    return res.status(404).render("login", {
      error: "Incorrect email or password",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

//Post Signup User
const createSignupUserController = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(404).send(`name, email and password required`);
    }

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(404).send("User Already Exist");
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullname,
      email,
      password: hashPass,
    });
    res.status(200).send(`Welcome ${user.fullname} to Blogify`);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

module.exports = {
  homePageUserController,
  createSigninUserController,
  createSignupUserController,
  getSigninUserController,
  getSignupUserController,
  logoutUserController,
  profileUserController,
};
