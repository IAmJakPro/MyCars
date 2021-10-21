// Third party libraries
const express = require('express');

const router = express.Router();

const devController = require('./devController');

const Vehicle = require('../models/vehicleModel');

router.get('/getBrands', devController.getBrands);
router.post('/storeBrands', devController.storeBrands);
router.post('/storeCategories', devController.storeCategories);

router.get('/schema', (req, res, next) => {
  const vehicleSchema = Vehicle.schema.paths;
  res.status(200).json({
    status: 'success',
    vehicleSchema,
  });
});

module.exports = router;
