const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById
} = require("../controllers/orderController");

router.post("/", placeOrder);

router.get("/user/:userId", getMyOrders);

router.get("/:id", getOrderById);

module.exports = router;