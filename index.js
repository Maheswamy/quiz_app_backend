require("dotenv").config();
const express = require("express");
const cors = require("cors");
const configration = require("./config/db");
const { checkSchema } = require("express-validator");
const {
  registerValidation,
  loginValidation,
} = require("./app/helpers/userSchemaValidation");

const usersCltr = require("./app/controllers/userCltr");
const {
  authenticateUser,
  authorizationUser,
} = require("./app/middleware/authenticateUser");
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3111;

configration();

//user endpoints
app.post(
  "/api/users/register",
  checkSchema(registerValidation),
  usersCltr.register
);
app.post("/api/users/login", checkSchema(loginValidation), usersCltr.login);

app.get(
  "/api/users/account",
  authenticateUser,
  authorizationUser(["admin", "user"]),
  usersCltr.account
);

app.listen(port, () => {
  console.log("server running in port", port);
});
