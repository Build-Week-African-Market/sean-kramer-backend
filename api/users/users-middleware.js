const users = require("../models/users-model");
const bcrypt = require("bcryptjs");
/* Middleware needed for auth-router: 
-1- checkForData - checks for a req.body, user_username, user_password
    user_username needs to be < 3 and >= 20 chars
    user_password needs to be < 3 and >= 25 chars
    user_email needs to be >= 100chars and have a valid email framing
-2- checkLogin - async - checks for valid usernames and passwords
-3- checkUsername - async - check if username already exists
    👀 -4- checkEmail - async - check if email already exists */
const checkForData = (req, res, next) => {
  const { username: user_username, password: user_password } = req.body;
  if (!Object.keys(req.body).length) {
    return res.status(401).json({
      message: "A username and password are required",
    });
  }
  if (
    !user_username ||
    user_username.length < 3 ||
    user_username.length >= 20
  ) {
    return res.status(401).json({
      message:
        "A username is required and must be between 3 and 20 characters.",
    });
  }
  if (
    !user_password ||
    user_password.length < 3 ||
    user_password.length >= 25
  ) {
    return res.status(401).json({
      message:
        "A password is required and must be between 3 and 25 characters.",
    });
  }
  next();
};
const checkLogin = async (req, res, next) => {
  try {
    const { username: user_username, password: user_password } = req.body;
    if (!user_username || !user_password) {
      return res.status(404).json({
        message: "A username and password are required.",
      });
    }
    const user = await users.findByUsername(user_username);
    console.log(user);
    const passwordCheck = await bcrypt.compare(
      user_password,
      user.user_password
    );
    console.log(passwordCheck);
    if (!user.user_username || !passwordCheck) {
      return res.status(404).json({
        message: "Invalid Credentials.",
      });
    }
    console.log(`this worked.`);
    next();
  } catch (err) {
    next(err);
  }
};
const checkUsername = async (req, res, next) => {
  try {
    const { username: user_username } = req.body;
    const user = await users.findByUsername(user_username).first();
    if (user) {
      return res.status(409).json({
        message: "The username is already in the database.",
      });
    }
  } catch (err) {
    next(err);
  }
};
const checkEmail = async (req, res, next) => {
  try {
    const { email: user_email } = req.body;
    const user = await users.findBy({ user_email }).first();
    if (user) {
      return res.status(409).json({
        message: "that email is already in the database.",
      });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  checkForData,
  checkLogin,
  checkUsername,
  checkEmail,
};