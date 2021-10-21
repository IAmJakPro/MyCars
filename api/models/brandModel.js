const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const Schema = mongoose.Schema;

const modelSchema = Schema({
  _id: String,
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const brandSchema = Schema(
  {
    _id: String,
    name: {
      fr: {
        type: String,
        required: true,
        unique: true,
      },
      ar: {
        type: String,
        required: true,
        unique: true,
      },
    },
    image: {
      type: String,
    },
    models: [modelSchema],
  },
  {
    timestamps: true,
  }
);

brandSchema.path('name.fr').set(function (v) {
  this._id = slugify(v);
  return v;
});

modelSchema.path('name').set(function (v) {
  this._id = slugify(v);
  return v;
});

brandSchema.method('toClient', function (lang) {
  const obj = this.toObject({ getters: true });
  if (lang) {
    obj.name = obj.name[lang];
  }

  //Rename fields
  delete obj._id;

  return obj;
});

brandSchema.index({
  'name.fr': 'text',
  'name.ar': 'text',
  'models.name': 'text',
});

module.exports = mongoose.model('Brand', brandSchema);
