// Third party libraries
const express = require('express');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const fileUploadMiddleware = require('../middlewares/fileUploadMiddleware');

// Controllers
const extraController = require('../controllers/extraController');

const router = express.Router();

router.get('/', extraController.getAllExtras);

// Routes below are restricted for super admins
//router.use(authMiddleware.checkLoggedAdmin);

router.post(
  '/upload',
  fileUploadMiddleware.single('image'),
  extraController.uploadExtraImage
);

router.post('/', extraController.createExtra);

router
  .route('/:id')
  .get(extraController.getExtra)
  .patch(extraController.updateExtra)
  .delete(extraController.deleteExtra);

module.exports = router;
