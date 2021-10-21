const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    _id: String,
    key: {
      fr: { type: String, require: true, unique: true },
      ar: { type: String, require: true, unique: true },
    },
    name: {
      fr: { type: String, require: true, unique: true },
      ar: { type: String, require: true, unique: true },
    },
  },
  { timestamps: true }
);

citySchema.path('name.fr').set(function (v) {
  this._id = slugify(v);
  return v;
});

citySchema.pre('save', async function () {
  this.key.ar = slugify(this.name.ar);
  this.key.fr = slugify(this.name.fr);
});

citySchema.method('toClient', function (lang) {
  const obj = this.toObject({ getters: true });
  if (lang) {
    obj.name = obj.name[lang];
  }

  //Rename fields
  delete obj._id;

  return obj;
});

citySchema.index({
  'name.fr': 'text',
  'name.ar': 'text',
  /* 'areas.name.fr': 'text',
  'areas.name.ar': 'text', */
});

module.exports = mongoose.model('City', citySchema);
