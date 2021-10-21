/**
 * Note: Every function here naturally returns the asyncHandler and its insides.
 * Arrow function naturally returns everything if declared without curly brackets.
 */

// Utils
const AppError = require('./appError');
const asyncHandler = require('./asyncHandler');

/**
 * This function is used to create a single document asynchronously.
 *
 * @param {Model} Model - A mongoose model
 * @return void
 */
exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

/**
 * This function is used to get all documents in a model.
 *
 * @param {Model} Model - A mongoose model
 * @return void
 */

/**
 * This function is used to populate items
 * @param {Query} query - a db query
 * @param {Array} items - fields that should be populated
 * @returns Query
 */
const handlePopulates = (query, items) => {
  items.map((item) => {
    query.populate(item);
  });
  return query;
};

/**
 * This function is sed to get the language from request headers
 * @param {Object} headers - the request headers
 * @returns string
 */
const getLang = (headers) => {
  const acceptLang = headers['accept-language'];

  if (!acceptLang) return null;

  if (acceptLang.indexOf('fr') > -1) return 'fr';

  if (acceptLang.indexOf('ar') > -1) return 'ar';

  return null;
};

exports.getAll = (Model, options = {}) =>
  asyncHandler(async (req, res, next) => {
    // Extract data from options
    const {
      searchFields = [], // these fields for searching

      // Fields to populate
      toPopulate = [],
    } = options;

    // Filtering and search query
    const { page = 1, search = '', limit = 12 } = req.query;
    let query;
    if (searchFields.length > 0) {
      query = {
        $or: [],
      };

      searchFields.map((sf) => {
        const obj = {};
        obj[sf] = {
          $regex: search,
          $options: 'i',
        };
        query.$or.push(obj);
      });
    }

    const queries = req.query;

    console.log(queries);

    for (const key in queries) {
      if (key == 'limit' || key == 'page' || key == 'search')
        continue;

      if (key.startsWith('min_')) {
        const newKey = key.replace('min_', '');
        query[newKey] = {
          $gt: queries[key],
        };
        continue;
      }

      if (key.startsWith('max_')) {
        const newKey = key.replace('max_', '');
        if (query[newKey]) {
          query[newKey]['$lt'] = queries[key];
        } else {
          query[newKey] = {
            $lt: queries[key],
          };
        }
        continue;
      }

      if (Array.isArray(queries[key]) && queries[key].length > 0) {
        queries[key].map((q) => query.$or.push({ key: q }));
        continue;
      }

      query[key] = queries[key];
    }

    let count = 0;
    let docs;

    // Get the populated docs
    docs = await handlePopulates(
      Model.find(query)
        .skip((parseInt(page) - 1) * limit)
        .limit(limit * 1),
      toPopulate
    );

    // Count the docs
    count = await Model.find(query).countDocuments();

    res.status(200).json({
      status: 'success',
      data: docs.map((doc) => doc.toClient(getLang(req.headers))),
      pagination: {
        totalPages: Math.ceil(count / limit),
        totalRecords: count,
        currentPage: parseInt(page),
        perPage: limit,
      },
    });
  });

/**
 * This function is used to get one document in a model.
 *
 * @param {Model} Model - A mongoose model
 * @return void
 */
exports.getOne = (Model, options = {}) =>
  asyncHandler(async (req, res, next) => {
    // Extract data from options
    const {
      // Fields to populate
      toPopulate = [],
    } = options;

    // Get the populated docs
    const doc = await handlePopulates(
      Model.findById(req.params.id),
      toPopulate
    );

    if (!doc) {
      return next(
        new AppError('No documents found with that ID!', 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: doc.toClient(getLang(req.headers)),
    });
  });

/**
 * This function is used to update a document in a model.
 *
 * @param {Model} Model - A mongoose model
 * @return void
 */
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      return next(
        new AppError('No documents found with that ID!', 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

/**
 * This function is used to delete a document in a model.
 *
 * @param {Model} Model - A mongoose model
 * @return void
 */
exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError('No documents found with that ID!', 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {},
    });
  });
