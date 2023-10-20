// routes/categories.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Define routes for category CRUD operations
router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);
router.get("/:categoryId", categoryController.getCategoryById);
router.put("/:categoryId", categoryController.updateCategory);
// router.delete("/:categoryId", categoryController.deleteCategory);
router.post("/delete", categoryController.deleteCategory);

module.exports = router;
