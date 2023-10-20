// routes/shippingInfoRoutes.js

const express = require('express');
const router = express.Router();
const shippingInfoController = require('../controllers/addressController');
const { isAuthenticated } = require('../middleware/auth');

// Create shipping information
router.post('/create', isAuthenticated, shippingInfoController.createShippingInfo);

// Retrieve shipping information
router.get('/get', isAuthenticated, shippingInfoController.getShippingInfo);

// Update shipping information
router.put('/update', isAuthenticated, shippingInfoController.updateShippingInfo);

// Delete shipping information
router.delete('/delete', isAuthenticated, shippingInfoController.deleteShippingInfo);

module.exports = router;
