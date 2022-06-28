const express = require("express");
const {
  login,
  createUser,
  updateUserInfo,
  deleteUser,
} = require("../../controllers/userController");
const router = express.Router();
const { auth } = require("../../middleware/authMiddleware");

router
  .route("/")
  .get(login)
  .post(createUser)
  .put(auth, updateUserInfo)
  .delete(auth, deleteUser);

module.exports = router;
