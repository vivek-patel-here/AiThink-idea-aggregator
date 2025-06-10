const { User } = require("../Models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register Logic
const RegisterLogic = async (req, res) => {
  const { username, email, password } = req.body;

  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    return res.status(400).json({
      success: false,
      message:
        "An account with this email already exists. Please log in or use a different email address to register.",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  const registeredUser = await newUser.save();

  if (!registeredUser) {
    return res
      .status(500)
      .json({ success: false, message: "Registration failed" });
  }

  const token = jwt.sign(
    { user: registeredUser.username, email: registeredUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("auth", token, {
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ success: true, message: "Registered Successfully!" });
};

//login Logic
const loginLogic = async (req, res) => {
  const { email, password } = req.body;

  const alreadyExists = await User.findOne({ email });
  if (!alreadyExists) {
    return res.status(400).json({
      success: false,
      message: "No user Found . Try Signing up.",
    });
  }

  const isCredentialtrue = await bcrypt.compare(
    password,
    alreadyExists.password
  );

  if (!isCredentialtrue) {
    return res
      .status(400)
      .json({ success: false, message: "Wrong Credential!" });
  }

  const token = jwt.sign(
    { user: alreadyExists.username, email: alreadyExists.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("auth", token, {
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ success: true, message: "Login Successfully!" });
};

//logout Logic
const LogoutLogic = async (req, res) => {
  res.clearCookie("auth", {
    httpOnly: true,
    signed: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({ success: true, message: "Logged out successfully!" });
};

module.exports = { loginLogic, RegisterLogic, LogoutLogic };
