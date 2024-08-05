const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../controllers/productControllers.js");

const router = express.Router();

router.post("/createProduct", protect, createProduct);
router.get("/products", protect, getAllProducts);
router
  .route("/products/:id")
  .get(protect, getProductById)
  .put(protect, updateProductById)
  .delete(protect, deleteProductById);

module.exports = router;
