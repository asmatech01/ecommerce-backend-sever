// models/order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who placed the order (for authenticated users)
},
  sessionId: {
    type: String, // Session ID for guest users
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the product in the order
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  shippingInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAddress', // Reference to the shipping information
  },
  orderStatus: [
    {
      type: {
        type: String,
        enum: ["ordered", "packed", "shipped", "delivered"],
        default: "ordered",
      },
      date: {
        type: Date,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  // Add any other fields as needed
},
{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
