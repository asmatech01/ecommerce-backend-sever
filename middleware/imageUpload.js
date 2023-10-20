// // middleware/imageUpload.js
// const multer = require('multer');
// const path = require('path');

// // Create a storage engine for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Store uploaded images in the 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const extname = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix + extname);
//   },
// });

// // Create a multer instance with the storage engine
// const upload = multer({ storage });

// // Middleware function to handle image uploads
// const imageUploadMiddleware = upload.single('categoryImage');

// module.exports = imageUploadMiddleware;
