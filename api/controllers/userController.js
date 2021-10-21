// Utils
const factory = require('../utils/handlerFactory');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appError');
const filterObj = require('../utils/filterObj');

// Models
const User = require('../models/userModel');

/**
 * Create a single user
 */
exports.createUser = factory.createOne(User);

/**
 * Update a single user
 */
exports.updateUser = factory.updateOne(User);

/**
 * Get a single user
 */
exports.getUser = factory.getOne(User);

/**
 * Get all users
 */
exports.getAllUsers = factory.getAll(User, {
  searchFields: ['name', 'email'],
});

/**
 * Delete a single user
 */
exports.deleteUser = factory.deleteOne(User);

/**
 * Update my profile
 */

exports.updateProfile = asyncHandler(async (req, res, next) => {
  // 1) Create an error if user tries to update their password.
  if (req.body.password) {
    return next(
      new AppError(
        'This route is not for password updates! Please use the /updatePassword route!',
        400
      )
    );
  }

  // 2) If not, simply update the User document.
  // We'll only get the 'firstName', 'lastName', 'address', and 'email'.
  // Filter out unwanted field names first, that are not allowed to be updated.
  const filteredBody = filterObj(
    req.body,
    true,
    'name',
    'email',
    'phone',
    'city'
  );

  // 3) Update the document.
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    filteredBody
  );

  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const updatedUser = User.findByIdAndUpdate(req.user._id, {
    password,
  });

  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});
