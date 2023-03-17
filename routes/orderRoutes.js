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

import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = AsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("unAuthorized Access, no token found");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Unauthorised Access");
  }
};

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/updatePastack").post(protect, updatePaystack);
router.route("/:id").get(protect, getOrderItems);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
export default router;
