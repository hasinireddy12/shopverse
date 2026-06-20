const Cart = require("../models/Cart");

// Add Product To Cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

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