const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const Schema = mongoose.Schema;

const extraSchema = Schema(
  {
    _id: String,
    name: {
      fr: { type: String, required: true },
      ar: { type: String, required: true },
    },
    image: { type: String },
  },
  { timestamps: false }
);

extraSchema.path('name.fr').set(function (v) {
  this._id = slugify(v);
  return v;
});

extraSchema.method('toClient', function (lang) {
  const obj = this.toObject({ getters: true });
  if (lang) {
    obj.name = obj.name[lang];
  }

  //Rename fields
  delete obj._id;

  return obj;
});

extraSchema.index({
  'name.fr': 'text',
  'name.ar': 'text',
});

module.exports = mongoose.model('Extra', extraSchema);
