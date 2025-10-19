const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password"); //exclude password

    if (!user) {
      res.locals.user = null;
      return next();
    }
    req.user = user; 
    res.locals.user = user; 
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.locals.user = null;
    next();
  }
};
