// Import required modules and packages
const express = require('express');
const cors = require('cors')
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // Assuming you've set up dotenv as mentioned earlier
// const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

app.use(cors());

// Body parser middleware to parse JSON requests
app.use(bodyParser.json());
// app.use(cookieParser()); // Add this line for cookie parsing
app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}));


const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


// Use the multer middleware to handle form data
app.use(upload.any()); // This allows handling any type of form data

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define your API routes here
// For example, you can create a separate routes.js file and import it here

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the e-commerce API');
});

const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart')
const shippingRoutes = require('./routes/address')
const orderRoutes = require('./routes/order')
const carouselRoutes = require('./routes/CMS/carousel')
const termaAndConditionsRoutes = require('./routes/CMS/termsAndConditions')
const initialDataRoutes = require("./routes/initialData");

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/shipping', shippingRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/carousel', carouselRoutes);
app.use('/api/conditions', termaAndConditionsRoutes);
app.use("/api", initialDataRoutes);

// API endpoint to serve the image file
app.get('/images/:id', (req, res) => {
  const imageId = req.params.id;

  // Read the image file from the server's file system
  const imagePath = path.join(__dirname, '/uploads', imageId); // Specify the correct path to the uploads directory
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Set the appropriate content type and send the image data
    res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on your image format
    res.send(data);
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  console.log("Internal Server error")
  res.status(500).json({ message: 'Internal Server Error' });
});


// // Handle 404 errors (route not found)
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// Start the Express server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
