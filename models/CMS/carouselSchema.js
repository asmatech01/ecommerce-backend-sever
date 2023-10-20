const mongoose = require("mongoose");

// Carousel Schema
const carouselSchema = new mongoose.Schema({
  carouselImage: [{ img: { type: String, require: true } }],
  caption: {
    type: String,
    // required: true,
  },
  link: {
    type: String,
    // required: true,
  },
});

// Carousel Model
const Carousel = mongoose.model("Carousel", carouselSchema);

module.exports = Carousel;
