const jwt = require("jsonwebtoken");
const { User } = require("../Models/UserModel");

const IsAuthorized = async (req, res, next) => {
  try {
    const { auth } = req.signedCookies;
    if (!auth) {
      return res.status(401).json({
        success: false,
        message: "No authentication Token found. Please Login",
      });
    }
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    const { user, email } = decoded;
    const userfound = await User.findOne({ email, username:user });
    if (!userfound) {
      return res.status(401).json({
        success: false,
        message: "Authentication Token is expired .Login again",
      });
    }

    req.user = userfound;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Authentication failed. Please Login.",
    });
  }
};

module.exports = { IsAuthorized };
