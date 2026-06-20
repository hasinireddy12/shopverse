const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      address,
      paymentMethod,
      totalAmount
    } = req.body;

    const order = await Order.create({
      userId,
      products,
      address,
      paymentMethod,
      totalAmount,
      status: "Pending"
    });

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