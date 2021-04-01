const users = require("./users-model");
const bcrypt = require("bcryptjs");
/* Middleware needed for auth-router: 
-1- checkForData - checks for a req.body, username, password
    username needs to be < 3 and >= 20 chars
    password needs to be < 3 and >= 25 chars
    email needs to be >= 100chars and have a valid email framing
-2- checkLogin - async - checks for valid usernames and passwords
-3- checkUsername - async - check if username already exists
    👀 -4- checkEmail - async - check if email already exists */
const checkForData = (req, res, next) => {
  const { username, password } = req.body
  if (!Object.keys(req.body).length) {
    return res.status(401).json({
      message: "A username and password are required",
    })
  }
  if (
    !username ||
    username.length < 3 ||
    username.length >= 20
  ) {
    return res.status(401).json({
      message:
        "A username is required and must be between 3 and 20 characters.",
    });
  }
  if (
    !password ||
    password.length < 3 ||
    password.length >= 25
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
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(404).json({
        message: "A username and password are required.",
      });
    }
    const user = await users.findByUsername(username);
    console.log(user);
if(!user) {
  return res.status(404).json({
    message: "Invalid Credentials.",
  })
}

    const passwordCheck = await bcrypt.compare(
      password,
      user.password
    );
    console.log(passwordCheck);
    if (!user.username || !passwordCheck) {
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
    const { username: username } = req.body;
    const user = await users.findByUsername(username).first();
    if (user) {
      return res.status(409).json({
        message: "The username is already in the database.",
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
};