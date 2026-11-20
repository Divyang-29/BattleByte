const express = require("express");
const {
  placeOrder,
  getAllOrders,
  changeOrderStatus
} = require("../controllers/orderController");

const auth = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware")

const router = express.Router();

// USER
router.post("/", auth, placeOrder);

// ADMIN
router.get("/admin", auth, adminMiddleware, getAllOrders);
router.put("/admin/:id/status", auth, adminMiddleware, changeOrderStatus);

module.exports = router;