const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  registerController,
  loginController,
} = require("../controllers/authController");
const router = express.Router();

// task
router.post("/register", registerController);
router.post("/protectedRoute", authMiddleware);
router.post("/login", authMiddleware, loginController);

module.exports = {
  authRouter: router,
};
