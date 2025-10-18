const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Authorization token missing",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    }
    req.user = decode;
    next();
  });
};
