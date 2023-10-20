// controllers/categoryController.js
const Category = require('../models/categorySchema');


function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    const categoryList = createCategories(categories);
    res.status(200).json({ categoryList });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller functions for category operations
// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//         const categoryList = createCategories(categories);
//     res.status(200).json({categoryList});
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

exports.createCategory = async (req, res) => {
    try {
      console.log('Request Body:', req.body); // Log the request body to see the data
      // Check if the "name" field is present in the request body
      if (!req.body.name) {
        return res.status(400).json({ message: 'Category name is required' });
      }
  
      const { name, parent } = req.body;
      console.log( name, parent)
      // Check if a category with the same name already exists
      const existingCategory = await Category.findOne({ name });
  
      if (existingCategory) {
        return res.status(400).json({ message: 'Category with the same name already exists' });
      }


      // Create a new category document
      const newCategory = new Category({
        name,
        parent: parent || null, // Set parent category ID or null if not provided
      });
  
      // If an image path is provided, set it
      if (req.file) {
        newCategory.image = req.file.path; // Assuming 'req.file.path' contains the image file path
      }
  
      // If a parent category ID is provided, add this category as a child of the parent
      if (parent) {
        const parentCategory = await Category.findById(parent);
        if (parentCategory) {
          parentCategory.children.push(newCategory._id);
          await parentCategory.save();
        }
      }
  
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  exports.getCategoryById = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const category = await Category.findById(categoryId);
      
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.json(category);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.updateCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {
        new: true, // Return the updated document
      });
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.json(updatedCategory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // exports.deleteCategory = async (req, res) => {
  //   try {
  //     const categoryId = req.params.categoryId;
  //     const deletedCategory = await Category.findByIdAndRemove(categoryId);
  
  //     if (!deletedCategory) {
  //       return res.status(404).json({ message: 'Category not found' });
  //     }
  
  //     res.json({ message: 'Category deleted' });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // };


  
exports.deleteCategory = async (req, res) => {
  const { ids } = req.body.payload;
  console.log({ids})
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i]._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};