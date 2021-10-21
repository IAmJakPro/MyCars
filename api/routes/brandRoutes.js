// Third party libraries
const express = require('express');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const fileUploadMiddleware = require('../middlewares/fileUploadMiddleware');

// Controllers
const brandController = require('../controllers/brandController');

const router = express.Router();

router.get('/', brandController.getAllBrands);

// Routes below are restricted for super admins
router.use(authMiddleware.checkLoggedAdmin);

router.post(
  '/upload',
  fileUploadMiddleware.single('image'),
  brandController.uploadBrandImage
);

router.post('/', brandController.createBrand);

router
  .route('/:id')
  .get(brandController.getBrand)
  .patch(brandController.updateBrand)
  .delete(brandController.deleteBrand);

module.exports = router;
