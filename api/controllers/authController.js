// Third party libraries
const jwt = require('jsonwebtoken');

/**
 * This function is used to sign the JWT to check whether the token is valid or not.
 *
 * @param {id} id - ID of the user.
 */
const signToken = (id, type = 'user') =>
  jwt.sign({ id, type }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 60 * 60 + 's',
  });

/**
 * This function is used to create and send token to user's cookie.
 *
 * @param {user} user - Currently logged in user
 * @param {statusCode} statusCode - Status code of the request
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 */
exports.createAndSendToken = (
  cookieKey,
  user,
  statusCode,
  req,
  res
) => {
  const token = signToken(user._id, cookieKey);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
    // Send a cookie to be secure if its on a production environment.
    // Check if the connection is secure, OR if the header contains HTTPS.
    secure:
      req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  // Send a cookie (back-end, must be assigned again in Next.js's proxy).
  res.cookie(cookieKey, token, cookieOptions);

  let role;

  if (cookieKey === 'jwtAdmin') {
    role = user.role;
  }

  // Remove passwords from output, then send response.
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    role,
    data: user.toClient(),
  });
};
