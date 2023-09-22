const jwt = require("jsonwebtoken");

const config = process.env;

const { usersDatabase } = require("../models/userModel"); // Import the usersDatabase path from your userModel or provide it directly

const authMiddleware = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded; // Attach the decoded user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
