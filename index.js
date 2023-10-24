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
const questionsCltr = require("./app/controllers/questionsCltr");
const {
  questionValidation,
  questionIdValidation,
} = require("./app/helpers/questionValidation");
const quizCltr = require("./app/controllers/quizCltr");
const { quizValidation } = require("./app/helpers/quizValidation");
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

// question end point

app.get(
  "/api/questions",
  authenticateUser,
  authorizationUser(["admin", "user"]),
  questionsCltr.read
);

app.get(
  "/api/questions/:questionId",
  authenticateUser,
  authorizationUser(["admin", "user"]),
  checkSchema(questionIdValidation),
  questionsCltr.readOne
);

app.post(
  "/api/questions",
  authenticateUser,
  authorizationUser(["admin"]),
  checkSchema(questionValidation),
  questionsCltr.create
);

app.put(
  "/api/questions/:questionId",
  authenticateUser,
  authorizationUser(["admin"]),
  checkSchema(questionIdValidation),
  checkSchema(questionValidation),
  questionsCltr.update
);

app.delete(
  "/api/questions/:questionId",
  authenticateUser,
  authorizationUser(["admin"]),
  checkSchema(questionIdValidation),
  questionsCltr.remove
);

// api for Quiz

app.post(
  "/api/quizzes",
  authenticateUser,
  authorizationUser(["admin"]),
  checkSchema(quizValidation),
  quizCltr.create
);

app.get(
  "/api/quizzes",
  authenticateUser,
  authorizationUser(["admin", "user"]),
  quizCltr.list
);
app.get(
    "/api/quizzes/:quizId",
    authenticateUser,
    authorizationUser(["admin", "user"]),
    quizCltr.list
  );

app.listen(port, () => {
  console.log("server running in port", port);
});
