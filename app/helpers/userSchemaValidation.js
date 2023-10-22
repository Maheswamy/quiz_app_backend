const User = require("../models/user-model");

const username = {
  notEmpty: {
    errorMessage: "username is required",
  },
};

const email = {
  notEmpty: {
    errorMessage: "email is required",
    bail: true,
  },
  isEmail: {
    errorMessage: "invalid email ",
    bail: true,
  },
  custom: {
    options: async (value) => {
      const result = await User.findOne({ email: value });
      if (result) {
        throw new Error("email already exists");
      } else {
        return true;
      }
    },
  },
};

const loginEmail = {
  notEmpty: {
    errorMessage: "email is required",
    bail: true,
  },
  isEmail: {
    errorMessage: "invalid email ",
    bail: true,
  },
};
const password = {
  notEmpty: {
    errorMessage: "password is required",
    bail: true,
  },
};

const registerValidation = {
  username,
  email,
  password,
};

const loginValidation = {
  email: loginEmail,
  password,
};

module.exports = { registerValidation, loginValidation };
