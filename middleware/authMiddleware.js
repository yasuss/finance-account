const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.session && req.session.jwt ? req.session.jwt : null;
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
};

module.exports = authMiddleware;
