const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("invalid token");
    }
    const tokenData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = tokenData;
    next();
  } catch (e) {
    throw new Error("invalid token ");
  }
};

const authorizationUser = (role) => {
  return function (req, res, next) {
    const result = role.includes(req.user.role);
    if (result) {
      next();
    } else {
      res
        .status(403)
        .json({ error: "you are not permitted to access this route" });
    }
  };
};

module.exports = { authenticateUser ,authorizationUser};
