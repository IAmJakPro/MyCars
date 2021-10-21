// Third party libraries
const express = require('express');

// Middlewares
const fileUploadMiddleware = require('../middlewares/fileUploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Controllers
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', categoryController.getAllCategories);

// Routes below are restricted for super admins
//router.use(authMiddleware.checkLoggedAdmin);

router.post(
  '/upload',
  fileUploadMiddleware.single('image'),
  categoryController.uploadCategoryImage
);
router.route('/').post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
