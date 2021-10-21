// Natural imports.
//const path = require('path');

// Third party imports.
//const compression = require('compression');
const cookieParser = require('cookie-parser');
//const cors = require('cors');
const express = require('express');
//const helmet = require('helmet');
//const hpp = require('hpp');
//const mongoSanitize = require('express-mongo-sanitize');
//const morgan = require('morgan');
//const rateLimit = require('express-rate-limit');
//const xss = require('xss-clean');

// Routing
const adminRouter = require('./routes/adminRoutes');
const userRouter = require('./routes/userRoutes');
const cityRouter = require('./routes/cityRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const vehicleRouter = require('./routes/vehicleRoutes');
const brandRouter = require('./routes/brandRoutes');
const extraRouter = require('./routes/extraRoutes');
const devRouter = require('./dev/devRoutes');

// Utilities
const AppError = require('./utils/appError');

// Middlewares
const errorMiddleware = require('./middlewares/errorMiddleware');

// Application Setup.
const app = express();

// Global Middlewares.
// Enable CORS (Access-Control-Allow-Origin: only from the client!)
//app.use(cors({ origin: process.env.CLIENT_SIDE_URL }));

// Before the real request is done, first respond to the OPTIONS request (it's a HTTP method).
// Send back the Access-Control-Allow-Origin to confirm that the request is safe to send.
// Apply this request on everything.
//app.options('*', cors({ origin: process.env.CLIENT_SIDE_URL }));

// Trust Proxies
//app.enable('trust proxy');

// Static Files
//app.use(express.static(path.join(__dirname, 'public')));

// Security Headers
//app.use(helmet());

// Body Parser
//app.use(express.json({ limit: '10kb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(cookieParser());

// Sanitize inputs (NoSQL query attacks)
//app.use(mongoSanitize());

// Sanitize inputs (XSS)
//app.use(xss());

// Preventing parameter tampering
//app.use(hpp());

// Rate Limiter
/* const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests! Please try again in an hour!',
}); */

// Development Logs
/* if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} */

// Compress the responses
//app.use(compression());

// Routing
//app.use('/api', limiter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE'
  );

  next();
});
const bcrypt = require('bcryptjs');

app.use('/api/admins', adminRouter);
app.use('/api/users', userRouter);
app.use('/api/cities', cityRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/vehicles', vehicleRouter);
app.use('/api/brands', brandRouter);
app.use('/api/extras', extraRouter);

app.use('/api/dev', devRouter);

// Defining undefined routes.
// If we are able to reach this point - then no route match.
// If we are able to reach other routes - then the request - response cycle would have been finished in the routes.
// If next() is passed anything - Express will assume that it is an error.
app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// Middleware for error handling.
app.use(errorMiddleware);

module.exports = app;
