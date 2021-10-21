// Third party libraries
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// Utils
const asyncHandler = require('../utils/asyncHandler');
const factory = require('../utils/handlerFactory');
const slugify = require('../utils/slugify');

// Models
const Brand = require('../models/brandModel');
const Category = require('../models/categoryModel');

// Data
const brandsJson = require('./brands.json');
const categoriesJson = require('./categories.json');

const getBrandsFromMoteur = async () => {
  const url =
    'https://www.moteur.ma/ar/voiture/vendez-voiture-occasion/action/sans-inscription/';
  process.setMaxListeners(0);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  await page.waitForSelector('select#select_mark_search');
  let html = await page.$eval('form', (el) => el.innerHTML);
  let $ = cheerio.load(html, null, false);
  const brandsOptions = $('#select_mark_search option');

  const brands = [];

  for (let i = 0; i < 30; i++) {
    const models = [];
    if ($(brandsOptions[i]).attr('disabled') == 'disabled') {
      i = brandsOptions.length;
      return;
    }
    const text = $(brandsOptions[i]).text();
    const id = $(brandsOptions[i]).attr('value');
    await page.select('select#select_mark_search', id);
    await page.waitForTimeout(3000);
    html = await page.$eval('form', (el) => el.innerHTML);
    $ = cheerio.load(html, null, false);

    const modelsOptions = $('#selectmodelId option');

    for (let l = 0; l < modelsOptions.length; l++) {
      models.push($(modelsOptions[l]).text());
    }
    brands.push({
      name: text,
      models,
    });
  }
  return brands;
};

exports.getBrands = asyncHandler(async (req, res, next) => {
  const brands = await getBrandsFromMoteur();

  return res.status(200).json({
    status: 'success',
    brands,
  });
});

const getFormattedBrands = () => {
  const newBrands = brandsJson.map((brand) => {
    return {
      //key: slugify(brand.name),
      name: {
        fr: brand.name
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        ar: brand.ar,
      },
      //https://storage.googleapis.com/vehicle_categories_bucket/brands/alfa-romeo.png
      image: `https://storage.googleapis.com/${
        process.env.BUCKET_NAME
      }/brands/${brand.name.toLowerCase()}.png`,
      models: brand.models.map((model) => ({
        //key: slugify(model),
        name: model
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase()),
      })),
    };
  });
  return newBrands;
};

exports.storeBrands = asyncHandler(async (req, res, next) => {
  const brandsToStore = getFormattedBrands();

  const storedBrands = [];

  for (let i = 0; i < brandsToStore.length; i++) {
    const sb = await Brand.create(brandsToStore[i]);
    storedBrands.push(sb);
  }

  return res.status(200).json({
    status: 'success',
    brandsToStore,
    storedBrands,
  });
});

const formatCategories = () => {
  const newCategories = categoriesJson.map((category) => ({
    key: slugify(category.name),
    image: `https://storage.googleapis.com/${process.env.BUCKET_NAME}/categories/${category.name}.svg`,
    name: {
      fr: category.fr,
      ar: category.ar,
    },
  }));
  return newCategories;
};

exports.storeCategories = asyncHandler(async (req, res, next) => {
  const categoriesToStore = formatCategories();

  const storedCategories = [];

  for (let i = 0; i < categoriesToStore.length; i++) {
    const sc = await Category.create(categoriesToStore[i]);
    storedCategories.push(sc);
  }

  return res.status(200).json({
    status: 'success',
    categoriesToStore,
    storedCategories,
  });
});
