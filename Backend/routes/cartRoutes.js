const express = require("express");
const {
  addProductToCart,
  fetchCart,
  changeQuantity,
  deleteCartItem,
} = require("../controllers/cartController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, addProductToCart);
router.get("/", auth, fetchCart);
router.put("/:id", auth, changeQuantity);
router.delete("/:id", auth, deleteCartItem);

module.exports = router;