const Carousel = require('../../models/CMS/carouselSchema');
const path = require('path');
const fs = require('fs');

// Create a new carousel item
exports.addCarousel = async (req, res) => {
    try {
      const { caption, link } = req.body;
      let carouselImage = [];

    if (req.files.length > 0) {
      carouselImage = req.files.map((file) => {
        return { img: file.filename };
      });
    }
      if (!req.files) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const newCarousel = new Carousel({
        carouselImage,
        caption,
        link,
      });
      const savedCarousel = await newCarousel.save();
      res.status(201).json(savedCarousel);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log({ error: error.message });
    }
  };

  
// Get all carousel items
exports.getCarousel = async (req, res) => {
  try {
    const carouselItems = await Carousel.find();
    res.json(carouselItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a carousel item
exports.updateCarousel = async (req, res) => {
  try {
    const { caption, link } = req.body;
    let updatedCarousel = {};

    if (req.files) {
      // Delete the existing image
      const carousel = await Carousel.findById(req.params.id);
      if (carousel.carouselImage && carousel.carouselImage.length > 0) {
        const imagePath = path.join(__dirname, "../../uploads", carousel.carouselImage[0].img);
        fs.unlinkSync(imagePath);
      }
      
      let carouselImage = [];

      if (req.files.length > 0) {
        carouselImage = req.files.map((file) => {
          return { img: file.filename };
        });
      }
      // Store the new image
      updatedCarousel = await Carousel.findByIdAndUpdate(
        req.params.id,
        { carouselImage, caption, link },
        { new: true }
      );
    } else {
      // If no new image is provided, update only the caption and link
      updatedCarousel = await Carousel.findByIdAndUpdate(
        req.params.id,
        { caption, link },
        { new: true }
      );
    }

    res.json(updatedCarousel);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log({ error: error.message });
  }
};

// Delete a carousel item
exports.deleteCarousel = async (req, res) => {
  try {
    const deletedCarousel = await Carousel.findByIdAndDelete(req.params.id);
    res.status(202).json(deletedCarousel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

