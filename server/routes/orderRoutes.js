import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

//diff between router.post vs router.route.post/get

router.route("/").post(protect, addOrderItems); //this is a controller method call if this route hit for GET or PUT
router.route("/:id").get(protect, getOrderById); //this is a controller method call if this route hit for GET or PUT
router.route("/:id/pay").put(protect, updateOrderToPaid); //this is a controller method call if this route hit for GET or PUT

export default router;
