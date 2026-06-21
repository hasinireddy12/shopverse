require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Order = require('../models/Order');

const userEmail = process.argv[2];
if (!userEmail) {
  console.error('Usage: node createOrder.js customer@example.com');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      console.error('User not found');
      process.exit(1);
    }

    const order = await Order.create({
      userId: user._id,
      products: [],
      address: '123 Test St',
      paymentMethod: 'COD',
      totalAmount: 100,
      paid: false,
      status: 'Processing'
    });

    console.log('Created order:', order._id.toString());
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
