// const Cart = require('../models/cartSchema');
// const Product = require('../models/ProductSchema');


// exports.addToCart = async (req, res) => {
//     try {
//       const { productId, quantity } = req.body;
//       let isGuest  = true;

//       if (req.user) {
//         isGuest = req.user.isGuest; // If the user is authenticated, update isGuest
//       }
  
//       // Find the user's cart based on whether they are a guest or authenticated
//       const cart = isGuest
//         ? await Cart.findOne({ user: req.user._id, isGuest: true })
//         : await Cart.findOne({ user: req.user._id, isGuest: false });
  
//       if (!cart) {
//         // Create a new cart if one doesn't exist for the user
//         const newCart = new Cart({
//           user: req.user._id,
//           isGuest: isGuest, // Set isGuest field based on user type
//           cartItems: [{ product: productId, quantity }],
//         });
//         await newCart.save();
//       } else {
//         // Update the existing cart
//         const existingCartItemIndex = cart.cartItems.findIndex(
//           (item) => item.product == productId
//         );
  
//         if (existingCartItemIndex !== -1) {
//           // If the product is already in the cart, update its quantity
//           cart.cartItems[existingCartItemIndex].quantity += quantity;
//         } else {
//           // If the product is not in the cart, add it
//           cart.cartItems.push({ product: productId, quantity });
//         }
  
//         await cart.save();
//       }
  
//       res.status(201).json({ message: 'Item added to the cart successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };

// exports.getCart = async (req, res) => {
//     try {
//       const { isGuest } = req.user; // Check whether the user is a guest
  
//       // Find the user's cart based on whether they are a guest or authenticated
//       const cart = isGuest
//         ? await Cart.findOne({ user: req.user._id, isGuest: true }).populate(
//             'cartItems.product'
//           )
//         : await Cart.findOne({ user: req.user._id, isGuest: false }).populate(
//             'cartItems.product'
//           );
  
//       if (!cart) {
//         return res.status(404).json({ message: 'Cart not found' });
//       }
  
//       res.status(200).json({ cart });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };

// // // Add a product to the cart
// // // exports.addToCart = async (req, res) => {
// // //   try {
// // //     const { productId, quantity } = req.body;
// // //     const userId = req.user ? req.user._id : null; // Check if user is authenticated

// // //     // Find the product
// // //     const product = await Product.findById(productId);

// // //     if (!product) {
// // //       return res.status(404).json({ message: 'Product not found' });
// // //     }

// // //     // Check if the user has an existing cart
// // //     let cart = await Cart.findOne({ user: userId });

// // //     // If no cart exists, create a new one
// // //     if (!cart) {
// // //       cart = new Cart({ user: userId, cartItems: [] });
// // //     }

// // //     // Check if the product is already in the cart
// // //     const cartItem = cart.cartItems.find((item) => item.product.equals(productId));

// // //     if (cartItem) {
// // //       // If the product is already in the cart, update the quantity
// // //       cartItem.quantity += quantity;
// // //     } else {
// // //       // If not, add the product to the cart
// // //       cart.cartItems.push({ product: productId, quantity });
// // //     }

// // //     // Save the updated cart
// // //     await cart.save();

// // //     res.status(201).json({ cart });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ message: 'Internal Server Error' });
// // //   }
// // // };

// // // Add a product to the cart
// // exports.addToCart = async (req, res) => {
// //     try {
// //       const { productId, quantity } = req.body;
// //       console.log(productId)
// //       const userId = req.user ? req.user._id : null; // Check if user is authenticated
  
// //       // Find the product
// //       const product = await Product.findById(productId);
  
// //       if (!product) {
// //         return res.status(403).json({ message: 'Product not found' });
// //       }
  
// //       // Check if the user has an existing cart
// //       let cart = null;
// //       if (userId) {
// //         // If the user is authenticated, find their cart in the database
// //         cart = await Cart.findOne({ user: userId });
// //       } else {
// //         // If the user is a guest, retrieve their cart data from cookies
// //         const guestCartData = req.cookies.cartData || [];
// //         cart = new Cart({ cartItems: guestCartData });
// //       }
  
// //       // Check if the product is already in the cart
// //       const cartItem = cart.cartItems.find((item) => item.product.equals(productId));
  
// //       if (cartItem) {
// //         // If the product is already in the cart, update the quantity
// //         cartItem.quantity += quantity;
// //       } else {
// //         // If not, add the product to the cart
// //         cart.cartItems.push({ product: productId, quantity });
// //       }
  
// //       // Save the updated cart
// //       await cart.save();
  
// //       // If the user is a guest, store their cart data in a cookie
// //       if (!userId) {
// //         res.cookie('cartData', cart.cartItems);
// //       }
  
// //       res.status(201).json({ cart });
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ message: 'Internal Server Error' });
// //     }
// //   };
  




// // exports.updateCartItem = async (req, res) => {
// //     try {
// //       const { cartItemId } = req.params;
// //       const { quantity } = req.body;
  
// //       // Check if the request has a user object (authenticated user)
// //       if (req.user) {
// //         const userId = req.user._id;
// //         // Find the user's cart
// //         const cart = await Cart.findOne({ user: userId });
  
// //         if (!cart) {
// //           return res.status(403).json({ message: 'Cart not found' });
// //         }
  
// //         // Find the cart item to update
// //         const cartItem = cart.cartItems.find((item) => item._id.equals(cartItemId));
  
// //         if (!cartItem) {
// //           return res.status(404).json({ message: 'Cart item not found' });
// //         }
  
// //         // Update the quantity
// //         cartItem.quantity = quantity;
  
// //         // Save the updated cart
// //         await cart.save();
  
// //         return res.status(200).json({ cart });
// //       } else {
// //         // For guest users, handle cart updates using cookies
// //         // Retrieve the guest user's cart data from cookies
// //         const guestCartData = req.cookies.cartData || [];
  
// //         // Update the quantity for the cart item with matching cartItemId
// //         const updatedGuestCartData = guestCartData.map((item) => {
// //           if (item._id === cartItemId) {
// //             return { ...item, quantity };
// //           }
// //           return item;
// //         });
  
// //         // Set the updated cart data in cookies
// //         res.cookie('cartData', updatedGuestCartData);
  
// //         return res.status(200).json({ message: 'Cart updated for guest user' });
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ message: 'Internal Server Error' });
// //     }
// //   };
  

// // // Update a cart item's quantity
// exports.updateCartItem = async (req, res) => {
//   try {
//     const { cartItemId } = req.params;
//     const { quantity } = req.body;

//     // Find the user's cart
//     const userId = req.user ? req.user._id : null; // Check if user is authenticated
//     const cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//       return res.status(403).json({ message: 'Cart not found' });
//     }

//     // Find the cart item to update
//     const cartItem = cart.cartItems.find((item) => item._id.equals(cartItemId));

//     if (!cartItem) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     // Update the quantity
//     cartItem.quantity = quantity;

//     // Save the updated cart
//     await cart.save();

//     res.status(200).json({ cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // Remove a cart item
// exports.removeCartItem = async (req, res) => {
//   try {
//     const { cartItemId } = req.params;

//     // Find the user's cart
//     const userId = req.user ? req.user._id : null; // Check if user is authenticated
//     const cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     // Remove the cart item from the cart
//     cart.cartItems = cart.cartItems.filter((item) => !item._id.equals(cartItemId));

//     // Save the updated cart
//     await cart.save();

//     res.status(204).end(); // No content response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


// cartController.js

const Cart = require('../models/cartSchema');
const Product = require('../models/ProductSchema'); // Import your Product schema

// Add a product to the cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    console.log(productId, quantity)
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart;

    if (req.headers.authorization) {
      // If the request has a JWT token, the user is authenticated
      const userId = req.user._id;
      cart = await Cart.findOne({ user: userId });
    } else {
      // If there's no JWT token, it's a guest user
      const sessionId = req.sessionId || req.ip;
      cart = await Cart.findOne({ sessionId: sessionId });
    }

    if (!cart) {
      // If the cart doesn't exist, create a new one
      const cartData = {
        user: req.user ? req.user._id : null,
        sessionId: req.sessionId, // Replace with your actual session handling logic
        items: [],
      };
      console.log('before saving cart -', sessionId )
      cart = new Cart(cartData);
    }

    // Check if the product is already in the cart; if yes, update the quantity
    const existingCartItem = cart.items.find(item => item.product.toString() === productId);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      // If it's a new product, add it to the cart
      cart.items.push({ product: productId, quantity: quantity, price: product.price });
    }

    await cart.save();
    return res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
// Update the cart (e.g., change quantity of an item)
exports.updateCart = async (req, res) => {
  try {
    // Parse input data from the request body
    const { productId, quantity } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user's cart (authenticated) or guest cart (not authenticated)
    const cart = req.user ? await Cart.findOne({ user: req.user._id }) : await Cart.findOne({ sessionId: req.sessionID });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the cart item to update
    const cartItem = cart.items.find(item => item.product.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }

    // Update the quantity
    cartItem.quantity = quantity;

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: 'Cart updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an item from the cart
exports.deleteFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the user's cart (authenticated) or guest cart (not authenticated)
    const cart = req.user ? await Cart.findOne({ user: req.user._id }) : await Cart.findOne({ sessionId: req.sessionID });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the item to delete
    const index = cart.items.findIndex(item => item.product.toString() === productId);

    if (index === -1) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }

    // Remove the item from the cart
    cart.items.splice(index, 1);

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: 'Item removed from the cart' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get the user's cart (authenticated) or guest cart (not authenticated)
exports.getCart = async (req, res) => {
  try {
    // Check if the user is authenticated
    if (req.user) {
      const userId = req.user._id;
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      return res.status(200).json({ cart });
    } else {
      // If the user is not authenticated, use the session ID to get the guest cart
      const sessionId = req.sessionID; // Replace with your session handling logic
      const cart = await Cart.findOne({ sessionId: sessionId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      return res.status(200).json({ cart });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

