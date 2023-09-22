const jwt = require("jsonwebtoken");
const { usersDatabase } = require("../models/userModel"); // Import the usersDatabase path from your userModel or provide it directly

const userMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is missing." });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("Error: ", err);
        return res
          .status(403)
          .json({ message: "A token is required for authentication" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userMiddleware;
