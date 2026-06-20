const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  deleteProduct
} = require("../controllers/adminController");

router.use(protect);
router.use(adminOnly);

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