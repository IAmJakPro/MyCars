// Utils
const factory = require('../utils/handlerFactory');

// Models
const City = require('../models/cityModel');

/**
 * Create a single city
 */
exports.createCity = factory.createOne(City);

/**
 * Update a single city
 */
exports.updateCity = factory.updateOne(City);

/**
 * Get a single city
 */
exports.getCity = factory.getOne(City);

/**
 * Get all cities
 */
exports.getAllCities = factory.getAll(City, {
  searchFields: ['name.fr', 'name.ar'],
});

/**
 * Delete a single city
 */
exports.deleteCity = factory.deleteOne(City);
