// const express = require('express');
// const router = express.Router();

// const { addToCart, getCart, updateCartItem, removeCartItem } = require('../controllers/cartController');

// // // Add a product to the cart
// // router.post('/add', addToCart);


// // // Update a cart item's quantity
// // router.put('/update/:cartItemId', updateCartItem);

// // // Remove a cart item
// // router.delete('/remove/:cartItemId', removeCartItem);

// module.exports = router;



// cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { isAuthenticated } = require('../middleware/auth'); // Implement authentication middleware


router.post('/add-to-cart', isAuthenticated, cartController.addToCart);
router.put('/update', isAuthenticated, cartController.updateCart);
router.delete('/delete/:productId', isAuthenticated, cartController.deleteFromCart);
router.get('/get', isAuthenticated, cartController.getCart);

module.exports = router;
