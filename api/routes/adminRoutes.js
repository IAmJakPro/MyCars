// Third party libraries
const express = require('express');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');

// Controllers
const adminAuthController = require('../controllers/adminAuthController');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Authentication for admins -- ability to login, logout.
router.get('/logout', adminAuthController.logout);
router.post('/login', adminAuthController.login);

// Routes below are restricted for super admins
router.use(
  authMiddleware.checkLoggedAdmin,
  authMiddleware.routeGuard('super_admin')
);

router
  .route('/')
  .get(adminController.getAllAdmins)
  .post(adminController.createAdmin);

router
  .route('/:id')
  .get(adminController.getAdmin)
  .patch(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

module.exports = router;
