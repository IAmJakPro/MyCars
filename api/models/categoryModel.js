const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const Schema = mongoose.Schema;

const categorySchema = Schema(
  {
    _id: String,
    name: {
      fr: { type: String, required: true },
      ar: { type: String, required: true },
    },
    image: { type: String },
  },
  { timestamps: true }
);

categorySchema.path('name.fr').set(function (v) {
  this._id = slugify(v);
  return v;
});

categorySchema.method('toClient', function (lang) {
  const obj = this.toObject({ getters: true });
  if (lang) {
    obj.name = obj.name[lang];
  }

  //Rename fields
  delete obj._id;

  return obj;
});

categorySchema.index({
  'name.fr': 'text',
  'name.ar': 'text',
});

module.exports = mongoose.model('Category', categorySchema);
