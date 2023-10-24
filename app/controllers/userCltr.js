const { validationResult } = require("express-validator");
const _ = require("lodash");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const usersCltr = {};

usersCltr.register = async (req, res) => {
  const body = _.pick(req.body, ["email", "username", "password"]);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const firstUser = await User.count();

    if (firstUser === 0) {
      body.role = "admin";
    }
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(body.password, salt);
    body.password = hashedPassword;
    const newUser = await new User(body).save();
    return res.json({
      message: `registration successfull ${newUser.username}`,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

usersCltr.login = async (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({ email: body.email });
    const result = await bcryptjs.compare(body.password, user.password);
    if (!result) {
      return res.status(400).json({ error: "invalid email or password" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (e) {
    res.status(500).json(e);
  }
};

usersCltr.account = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = usersCltr;
