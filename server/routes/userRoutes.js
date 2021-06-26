import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUserForAdmin,
  getUserById,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

//diff between router.post vs router.route.post/get

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile); //this is a controller method call if this route hit for GET or PUT
router.route("/").post(registerUser).get(protect, admin, getUsers);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserForAdmin);

export default router;
