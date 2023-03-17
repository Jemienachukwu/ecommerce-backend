import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderItems,
  getOrders,
  getMyOrders,
  updatePaystack,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(addOrderItems).get(getOrders);
router.route("/myorders").get(getMyOrders);
router.route("/updatePastack").post(updatePaystack);
router.route("/:id").get(getOrderItems);
router.route("/:id/deliver").put(updateOrderToDelivered);
export default router;
