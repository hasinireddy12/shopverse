const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place Order
const placeOrder = async (req, res) => {
  try {
    // Require authenticated user id from token
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userId = req.user.id;
    const {
      products,
      address,
      paymentMethod,
      totalAmount
    } = req.body;

    // Prevent admin users from placing orders
    if (req.user && req.user.role === "admin") {
      return res.status(403).json({ message: "Admins are not allowed to place orders" });
    }

    // Determine payment and status based on selected payment method
    const orderData = {
      userId,
      products,
      address,
      paymentMethod,
      totalAmount
    };

    if (paymentMethod === "COD") {
      orderData.paid = false;
      orderData.status = "Processing";
    } else {
      // For this demo we simulate successful online payments
      orderData.paid = true;
      orderData.status = "Processing";
    }

    const order = await Order.create(orderData);

    // Clear cart after order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({
      message: "Order Placed Successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get User Orders
const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      userId: req.params.userId
    }).populate("products.productId");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Single Order
const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(
      req.params.id
    ).populate("products.productId");

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found"
      });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById
};

// Get All Orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products.productId")
      .populate("userId", "name email");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};