const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  deleteProduct
} = require("../controllers/adminController");

router.get("/users", getAllUsers);

router.get("/orders", getAllOrders);

router.put(
  "/orders/:id",
  updateOrderStatus
);

router.delete(
  "/products/:id",
  deleteProduct
);

module.exports = router;