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
    query.populate(item.name);
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

/**
 * This function is used to get teh translated fields of the sub-documents. ex: name: {ar: name_ar, fr: name_fr}
 * this sub-documents here mainly are the fields of toPopulate
 * @param {Array} docs - Array of documents (sub-documnets)
 * @param {Array} items - Items that should be translated (toPopulate items)
 * @param {String} lang - Language
 * @returns Translated documents (sub-documnets)
 */
const getTranslatedSubDoc = (docs, items, lang) => {
  // Stop if no items to translate or the lang is null
  if (items.length < 1 || !lang) {
    return docs;
  }

  return docs.map((doc) => {
    for (let item of items) {
      const splitedItem = item.name.split('.');
      let sub = { ...doc };
      let toChange = { ...doc };
      toChange = toChange[splitedItem[0]];
      let index = 0;
      for (let i of splitedItem) {
        sub[i] = toChange;
        if (index !== 0) {
          toChange = toChange[i];
          if (index === splitedItem.length - 1) {
            for (let t of item.trans) {
              toChange[t] = toChange[t][lang];
            }
          }
        }
        index++;
      }

      doc = sub;
    }
    return doc;
  });
};

/**
 * This function is used to get translated fields of documents
 * @param {Array} docs - array of documents
 * @param {Object} langFilter - the langFilter objects contains the options of the filtering
 * @param {String} lang - the language to get translated fields with
 * @returns translated documents
 */
const filterByLang = (docs, langFilter, lang) => {
  // Stop if the translation allow is set to false, or teh fields array to be translated is empty, or the language is null
  if (!langFilter.allow || langFilter.fields.length < 1 || !lang) {
    // If it's only one document
    if (!Array.isArray(docs)) {
      return docs.toClient();
    }

    // If its an array of documents
    return docs.map((doc) => doc.toClient());
  }

  // If the filtring is allowed and the items to translate aren't empty
  // If it's only one document
  if (!Array.isArray(docs)) {
    const newDoc = docs.toClient();
    langFilter.fields.map((field) => {
      newDoc[field] = newDoc[field][lang];
    });
    return newDoc;
  }

  // If its an array of documents
  return docs.map((doc) => {
    const newDoc = doc.toClient();
    langFilter.fields.map((field) => {
      newDoc[field] = newDoc[field][lang];
    });
    return newDoc;
  });
};

exports.getAll = (Model, options = {}) =>
  asyncHandler(async (req, res, next) => {
    // Extract data from options
    const {
      searchFields = [], // these fields for searching

      // This for getting the translated fields
      langFilter = {
        allow: false,
        fields: [],
      },

      // Fields to populate
      toPopulate = {
        allow: false,
        items: [],
      },
    } = options;

    // Filtering and search query
    const { page = 1, search = '', limit = 3 } = req.query;
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

    let count = 0;
    let docs;

    // Get the populated docs
    docs = await handlePopulates(
      Model.find(query)
        .skip((parseInt(page) - 1) * limit)
        .limit(limit * 1),
      toPopulate.items
    );

    // Count the docs
    count = await Model.find(query).countDocuments();

    // Filter the documents by lang
    // If the langFilter si not allowed it will return the same docs
    const myDocs = filterByLang(
      docs,
      langFilter,
      getLang(req.headers)
    );

    res.status(200).json({
      status: 'success',
      data: getTranslatedSubDoc(
        // Get the translated sub-documents, if NOT toPopulate items, the   function will return the same documents
        myDocs,
        toPopulate.items,
        getLang(req.headers)
      ),
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
      // This for getting the translated fields
      langFilter = {
        allow: false,
        fields: [],
      },

      // Fields to populate
      toPopulate = {
        allow: false,
        items: [],
      },
    } = options;

    // Get the populated docs
    const doc = await handlePopulates(
      Model.findById(req.params.id),
      toPopulate.items
    );

    if (!doc) {
      return next(
        new AppError('No documents found with that ID!', 404)
      );
    }

    // Filter the document by lang
    // If the langFilter si not allowed it will return the same document
    const myDoc = filterByLang(
      doc,
      langFilter,
      getLang(req.headers),
      toPopulate.items
    );

    res.status(200).json({
      status: 'success',
      // Get the translated sub-document, if NOT toPopulate items, the function will return the same document
      data: getTranslatedSubDoc(
        myDoc,
        toPopulate.items,
        getLang(req.headers)
      ),
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
