// controllers/productController.js
const Product = require('../models/ProductSchema');
const path = require('path');
const fs = require('fs');

// Controller functions for product operations
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({products});
    console.log("here is products")
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const multer = require('multer');

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where you want to store the images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set a unique filename for each image
  },
});

const fileFilter = (req, file, cb) => {
  // Check file types to allow only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

// Set up multer middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Use the upload middleware to handle the productPicture field
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, quantity, color } = req.body;

    let productImage = [];

    if (req.files.length > 0) {
      productImage = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ message: 'A product with the same name already exists' });
    }

    const newProduct = new Product({
      name,
      price,
      quantity,
      color,
      // productImage: path.join('uploads', filename), // Construct the file path
      productImage,
      description,
      category,
    });

    await newProduct.save();
    res.status(201).json({ product: newProduct, files: req.files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// exports.createProduct = async (req, res) => {
//   try {
//     const { name, price, description, category, quantity } = req.body;

//     // Process uploaded images and store their paths/URLs in an array
//     const productImage = req.files.map(file => {
//       return { img: file.location }; // Assuming 'location' is where the file paths/URLs are stored
//     });

//     // Check if a product with the same name already exists
//     const existingProduct = await Product.findOne({ name });

//     if (existingProduct) {
//       return res.status(400).json({ message: 'Product with the same name already exists' });
//     }

//     // Create a new Product document with the images
//     const newProduct = new Product({
//       name,
//       price,
//       quantity,
//       productImage, // Assign the array of image paths/URLs here
//       description,
//       category,
//     });

//     await newProduct.save();
//     res.status(201).json({ product: newProduct, files: req.files });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };



// exports.createProduct = async (req, res) => {
//     try {
//       const { name, price, description, category, quantity } = req.body;
    
//          // Use the upload middleware to handle the productPicture field
//     upload.array('productPicture')(req, res, async (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(400).json({ message: 'Error uploading images' });
//       }
//       let productImage = [];
  
//       if (req.files.length > 0) {
//         productImage = req.files.map((file) => {
//           return { img: file.location };
//         });
//       }

//           // Check if a category with the same name already exists
//           const existingProduct = await Product.findOne({ name });
  
//           if (existingProduct) {
//             return res.status(400).json({ message: 'product with the same name already exists' });
//           }
  
//       const newProduct = new Product({
//         name,
//         price,
//         quantity,
//         productImage,
//         description,
//         category,
//       });
  
//       await newProduct.save();
//       res.status(201).json({ product: newProduct, files: req.files });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };

// exports.updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
//       new: true, // Return the updated document
//     });
//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.json(updatedProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, price, description, category, quantity, color } = req.body;

    let productImage = [];
    if (req.files && req.files.length > 0) {
      // Delete existing images
      const existingProduct = await Product.findById(productId);
      if (existingProduct.productImage && existingProduct.productImage.length > 0) {
        existingProduct.productImage.forEach((image) => {
          fs.unlinkSync(path.join(__dirname, '..', 'uploads', image.img));
        });
      }}
    if (req.files && req.files.length > 0) {
      productImage = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, category, quantity, color, productImage },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndRemove(productId);
    if (!deletedProduct) {
      return res.status(405).json({ message: 'Product not found' });
    }
    res.status(202).json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
