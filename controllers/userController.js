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
  return res.render("profile", { user: req.user });
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
      return res.status(200).redirect("/profile");
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
      return res
        .status(400)
        .render("signup", { error: "All fields are required" });
    }

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).render("signup", { error: "User already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullname,
      email,
      password: hashPass,
    });

    // Auto login after signup
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    res.cookie("token", token, { httpOnly: true, secure: false });

    return res.redirect("/profile");
  } catch (error) {
    console.error(error);
    return res.status(500).render("signup", { error: "Something went wrong" });
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
