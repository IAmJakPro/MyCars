// Utils
const factory = require('../utils/handlerFactory');
const asyncHandler = require('../utils/asyncHandler');
const uploadImage = require('../utils/uploadHelper');

// Models
const Brand = require('../models/brandModel');

/**
 * Create a single Brand
 */
exports.createBrand = factory.createOne(Brand);

/**
 * Update a single Brand
 */
exports.updateBrand = factory.updateOne(Brand);

/**
 * Get a single Brand
 */
exports.getBrand = factory.getOne(Brand);

/**
 * Get all categories
 */
exports.getAllBrands = factory.getAll(Brand, {
  searchFields: ['name.fr', 'name.ar'],
});

/**
 * Delete a single Brand
 */
exports.deleteBrand = factory.deleteOne(Brand);

/**
 * Upload brand image
 */
exports.uploadBrandImage = asyncHandler(async (req, res, next) => {
  const myFile = req.file;
  const imageUrl = await uploadImage(myFile, 'brands');
  res.status(200).json({
    status: 'success',
    data: imageUrl,
  });
});
