const Cart = require("../models/Cart");

// Add Product To Cart
const addToCart = async (req, res) => {
  try {
    // Prefer authenticated user id from token; fall back to body.userId
    const userId = (req.user && req.user.id) || req.body.userId;
    const { productId, quantity } = req.body;

    // Block admin users from adding to cart
    if (req.user && req.user.role === "admin") {
      return res.status(403).json({ message: "Admins are not allowed to add items to cart" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        products: [
          {
            productId,
            quantity
          }
        ]
      });
    } else {
      cart.products.push({
        productId,
        quantity
      });

      await cart.save();
    }

    res.status(200).json({
      message: "Product Added To Cart",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// View Cart
const getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      userId: req.params.userId
    }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Remove Product
const removeFromCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      userId: req.params.userId
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.products = cart.products.filter(
      item =>
        item.productId.toString() !== req.params.productId
    );

    await cart.save();

    res.status(200).json({
      message: "Product Removed"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart
};