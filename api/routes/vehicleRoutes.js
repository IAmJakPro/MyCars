// Third party libraries
const express = require('express');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');
const fileUploadMiddleware = require('../middlewares/fileUploadMiddleware');

// Controllers
const vehicleController = require('../controllers/vehicleController');

const router = express.Router();

// Routes below are restricted for super admins
//router.use(authMiddleware.checkLoggedAdmin);

// For test
const asyncHandler = require('../utils/asyncHandler');
const Vehicle = require('../models/vehicleModel');

router.get(
  '/test',
  asyncHandler(async (req, res, next) => {
    const query = {
      'ad_details.price': { $lt: 2000 },
    };
    const docs = await Vehicle.find(query);

    res.status(200).json({
      status: 'success',
      data: docs,
    });
  })
);

router.get(
  '/my-ads',
  authMiddleware.checkLoggedUser,
  userMiddleware.getMe,
  vehicleController.getMyAds
);

/* router.post(
  '/upload',
  fileUploadMiddleware.array('images'),
  vehicleController.uploadBrandImages
); */

router.post(
  '/',
  fileUploadMiddleware.array('images'),
  vehicleController.uploadBrandImages,
  vehicleController.createVehicle
);

router.route('/').get(vehicleController.getAllVehicles);

router
  .route('/:id')
  .get(vehicleController.getVehicle)
  .patch(vehicleController.updateVehicle)
  .delete(vehicleController.deleteVehicle);

module.exports = router;
