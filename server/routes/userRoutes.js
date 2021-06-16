import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

//check diff betweene reuter.post vs router.route.post/get

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile); //this is a controller method call if this route hit for GET
router.route("/").post(registerUser);

export default router;
