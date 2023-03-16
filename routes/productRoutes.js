import express from "express";
admin;
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  reviewProduct,
  getTopProucts,
} from "../controllers/productController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, reviewProduct);
router.get("/top", getTopProucts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
export default router;
