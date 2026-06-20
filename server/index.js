const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Error Middleware
const errorHandler = require("./middleware/errorMiddleware");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
  res.send("ShopVerse API Running Successfully");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Error Handler
app.use(errorHandler);

// Server Port
const PORT = process.env.PORT || 8000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});