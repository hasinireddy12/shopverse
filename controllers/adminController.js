const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("products.productId");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product Deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  deleteProduct
};