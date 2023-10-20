const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to your Product schema
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to your User schema (for authenticated users)
    },
    sessionId: {
      type: String, // For guest users, store a unique session identifier
    },
    items: [cartItemSchema], // An array of cart items
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
