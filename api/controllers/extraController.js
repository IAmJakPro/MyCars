// Utils
const factory = require('../utils/handlerFactory');
const asyncHandler = require('../utils/asyncHandler');
const uploadImage = require('../utils/uploadHelper');

// Models
const Extra = require('../models/ExtraModel');

/**
 * Create a single Extra
 */
exports.createExtra = factory.createOne(Extra);

/**
 * Update a single Extra
 */
exports.updateExtra = factory.updateOne(Extra);

/**
 * Get a single Extra
 */
exports.getExtra = factory.getOne(Extra);

/**
 * Get all categories
 */
exports.getAllExtras = factory.getAll(Extra, {
  searchFields: ['name.fr', 'name.ar'],
});

/**
 * Delete a single Extra
 */
exports.deleteExtra = factory.deleteOne(Extra);

/**
 * Upload extra image
 */
exports.uploadExtraImage = asyncHandler(async (req, res, next) => {
  const myFile = req.file;
  const imageUrl = await uploadImage(myFile, 'extras');
  res.status(200).json({
    status: 'success',
    data: imageUrl,
  });
});
