const { validateToken } = require("../services/auth");

// for validating the JWT token and adding the  user object in the request 
const handleJWT = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    res.status(400).json({ status: "Not authorized User" });
    return;
  }
  try {
    const user = validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ status: "Not authorized User", msg: error.message });
    return;
  }
};
module.exports = { handleJWT };
