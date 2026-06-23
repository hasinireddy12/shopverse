# ShopVerse 🛒

## Overview

ShopVerse is a MERN Stack e-commerce web application that provides a seamless online shopping experience for customers and a powerful management interface for administrators. The platform enables users to browse products, manage shopping carts, place orders, and track purchases efficiently.

## Features

### Customer Features

* User Registration and Login
* Secure Authentication using JWT
* Browse Products by Category
* Search and View Product Details
* Add Products to Cart
* Update and Remove Cart Items
* Checkout and Place Orders
* View Order History
* Manage User Profile

### Admin Features

* Admin Dashboard
* Product Management (Add, Update, Delete)
* Category Management
* Banner Management
* Order Management
* User Management

## Technology Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Bootstrap
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Tokens (JWT)
* bcryptjs

## Project Structure

```text
ShopVerse
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

## Installation

### Prerequisites

* Node.js
* MongoDB
* npm

### Clone the Repository

```bash
git clone https://github.com/your-username/shopverse.git
cd shopverse
```

### Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the Application

Backend:

```bash
npm start
```

Frontend:

```bash
npm run dev
```

## Usage

1. Register a new account or log in.
2. Browse available products.
3. Add products to the shopping cart.
4. Proceed to checkout and place an order.
5. Track orders through the orders section.
6. Use the admin dashboard to manage products and orders.

## Future Enhancements

* Online Payment Gateway Integration
* Product Reviews and Ratings
* Wishlist Functionality
* Email Notifications
* Advanced Product Filtering
* Mobile Application Support

## Testing

The application has been tested for:

* User Registration and Login
* Product Browsing and Search
* Cart Operations
* Order Placement
* Profile Management
* Admin Product Management

## Authors

Developed as part of an academic project.

## License

This project is intended for educational and learning purposes.
