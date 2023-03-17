import express from "express";
const router = express.Router();
import {
  authUser,
  deleteUser,
  getUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
// var protect = require("../middleware/authMiddleware");
// const admin = require("../middleware/authMiddleware");
router.route("/").post(registerUser).get(protect, admin, getUser);

router.post("/login", authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
export default router;
