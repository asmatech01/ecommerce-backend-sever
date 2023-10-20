const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: String,
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    children: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    }],
    image: String, // Add the image field
  });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
