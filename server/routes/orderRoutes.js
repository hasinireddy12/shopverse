const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/", protect, placeOrder);

// Admin: get all orders
router.get("/", protect, adminOnly, getAllOrders);

router.get("/user/:userId", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

module.exports = router;