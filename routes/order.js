// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated } = require('../middleware/auth');

// Create a new order
router.post('/create', isAuthenticated, orderController.createOrder);

// Retrieve order details
router.get('/:orderId', isAuthenticated, orderController.getOrderDetails);

// Update order status
router.put('/:orderId/update-status', isAuthenticated, orderController.updateOrderStatus);

// List user's order history
router.get('/user/orders', isAuthenticated, orderController.listUserOrders);

module.exports = router;
