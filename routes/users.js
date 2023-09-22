const express = require("express");
const {
  deleteSingleUserController,
} = require("../controllers/usersController.js"); // delete single user
const {
  updateSingleUserController,
} = require("../controllers/usersController.js"); // update single user
const userMiddleware = require("../middlewares/usersMiddleware.js");
const {
  getUsersController,
  getSingleUserController,
} = require("../controllers/usersController");
const router = new express.Router();

router.get("/", getUsersController);
router.get("/protectedRoute", userMiddleware);
router.get("/:id", userMiddleware, getSingleUserController);
router.delete("/:id", userMiddleware, deleteSingleUserController);
router.put("/:id", userMiddleware, updateSingleUserController);

module.exports = { usersRouter: router };
