const userModel = require("../models/user");
const bcrypt = require("bcrypt");

//Get Login User
const getSigninUserController = (req, res) => {
  // return res.render("signin");
  res.send("Kaafi dur se he");
};
//Get SignUp User
const getSignupUserController = (req, res) => {
  return res.render("signup");
};

//Post Signin User
const createSigninUserController = async (req, res) => {};

//Post Signup User
const createSignupUserController = async (req, res) => {
  try {
    const { fullname, email, salt, password, profileImageURL, role } = req.body;

    if (!fullname || !email || !password) {
      return res.send(`name, email and password required`);
    }

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.send("User Already Exist");
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullname,
      email,
      salt,
      password: hashPass,
      profileImageURL,
      role,
    });
    res.send(user);
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

module.exports = {
  createSigninUserController,
  createSignupUserController,
  getSigninUserController,
  getSignupUserController,
};
