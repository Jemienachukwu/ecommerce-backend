import express from "express";
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
// var protect = require("../middleware/authMiddleware");
// const admin = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id/reviews").post(reviewProduct);
router.get("/top", getTopProucts);
router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);
export default router;
