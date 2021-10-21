// Utils
const factory = require('../utils/handlerFactory');

// Models
const Vehicle = require('../models/vehicleModel');
const asyncHandler = require('../utils/asyncHandler');
const uploadImage = require('../utils/uploadHelper');

/**
 * Create a single Vehicle
 */
exports.createVehicle = factory.createOne(Vehicle);

/**
 * Update a single Vehicle
 */
exports.updateVehicle = factory.updateOne(Vehicle);

/**
 * Get a single Vehicle
 */
exports.getVehicle = factory.getOne(Vehicle);

/**
 * Get all Vehicles
 */
exports.getAllVehicles = factory.getAll(Vehicle, {
  searchFields: ['ad_details.title', 'ad_details.description'],
});

/**
 * Delete a single Vehicle
 */
exports.deleteVehicle = factory.deleteOne(Vehicle);

/**
 * Get user ads
 */

exports.getMyAds = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  console.log(id);
  const docs = await Vehicle.find({ user: id });
  res.status(200).json({
    status: 'success',
    data: docs.map((doc) =>
      doc.toClient(req.headers['accept-language'])
    ),
  });
});

/**
 * Upload brand image
 */
exports.uploadBrandImages = asyncHandler(async (req, res, next) => {
  const images = req.files;
  console.log('Images: ', images);
  console.log('body: ', req.body);
  const storedImages = [];
  for (const image of images) {
    console.log('Single image: ', image);
    const imageUrl = await uploadImage(image, 'vehicles', true);
    storedImages.push(imageUrl);
  }
  console.log(storedImages);

  req.body['ad_details.images'] = storedImages;

  next();

  /* res.status(200).json({
    status: 'success',
    data: storedImages,
  }); */
});
