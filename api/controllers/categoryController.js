// Utils
const factory = require('../utils/handlerFactory');
const asyncHandler = require('../utils/asyncHandler');
const uploadImage = require('../utils/uploadHelper');

// Models
const Category = require('../models/categoryModel');

/**
 * Create a single category
 */
exports.createCategory = factory.createOne(Category);

/**
 * Update a single category
 */
exports.updateCategory = factory.updateOne(Category);

/**
 * Get a single category
 */
exports.getCategory = factory.getOne(Category);

/**
 * Get all categories
 */
exports.getAllCategories = factory.getAll(Category, {
  searchFields: ['name.fr', 'name.ar'],
});

/**
 * Delete a single category
 */
exports.deleteCategory = factory.deleteOne(Category);

/**
 * Upload category image
 */
exports.uploadCategoryImage = asyncHandler(async (req, res, next) => {
  const myFile = req.file;
  const imageUrl = await uploadImage(myFile, 'categories');
  res.status(200).json({
    status: 'success',
    data: imageUrl,
  });
});
