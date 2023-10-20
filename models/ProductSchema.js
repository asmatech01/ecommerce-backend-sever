const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  },
  color: {
    type: String
  },
  productImage: [
    {img: { type: String}}
  ], 
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the category it belongs to
    required: true,
  },
  // Add other product attributes as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

    // productImage: [ String ], 