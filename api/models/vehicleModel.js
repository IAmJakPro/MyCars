const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    // Vehicle details
    vehicle_details: {
      general: {
        condition: {
          type: String,
          enum: ['excellent', 'very_good', 'good', 'fair', 'poor'],
          default: 'used',
        },
        /* offer_type: {
          type: String,
          enum: ['sale', 'wanted', 'rent'],
          default: 'sale',
          required: true,
        }, */
        category: {
          type: String,
          ref: 'Category',
          required: true,
        },
        brand: {
          type: String,
          ref: 'Brand',
          required: true,
        },
        model: {
          type: String,
          ref: 'Brand.models',
          required: true,
        },
        year: {
          type: Number,
          min: 1940,
          max: new Date().getFullYear(),
          required: true,
        },
        crashed: { type: Boolean, default: false },
        previous_owners: {
          type: Number,
          required: false,
          min: 1,
          max: 10,
        },
        garanty: { type: Boolean, default: false },
        origin: {
          type: String,
          enum: [
            'cleared',
            'not_cleared',
            'imported_new',
            'imported_used',
            'ww',
            null,
          ],
          default: null,
        },
      },
      engine: {
        mileage: { type: Number, required: false },
        //engine: { type: String },
        transmission: {
          type: String,
          enum: ['automatic', 'manuel'],
          required: true,
        },
        fuel_type: {
          type: String,
          enum: ['gasoline', 'diesel', 'electric', 'hybrid', 'other'],
          required: true,
        },
        power: { type: Number, min: 2 },
        drive_type: {
          type: String,
          enum: ['4wd', 'rwd', 'fwd', 'awd', null],
          default: null,
          required: false,
        },
        size: { type: Number, min: 1, max: 10 },
        consumption: {
          type: Number,
          min: 2,
          max: 20,
        },
      },

      body: {
        // Body
        extern_color: { type: String },
        intern_color: { type: String },
        doors: { type: Number, min: 2, max: 10 },
        seats: { type: Number, min: 2, max: 10 },
        interior_type: {
          type: String,
          enum: [
            'alcantar',
            'cloth',
            'full_leather',
            'leatherette',
            'part_leather',
            'velour',
            'nylon',
            'faux_vinyl',
            'other',
            null,
          ],
          default: null,
          required: false,
        }, // Re-Check
      },
      extras: [{ type: String, ref: 'Extra' }],
    },

    // Ad details
    ad_details: {
      title: { type: String, required: true },
      description: { type: String },
      ad_duration: { type: Number, default: 7 },
      price: { type: Number },
      is_negociable: { type: Boolean, default: false },
      //youtube_url: { type: String },
      images: [{ type: String }],
    },

    // Contact details
    contact_details: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      city: {
        type: String,
        ref: 'City',
        required: true,
      },
    },

    // Creator
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

vehicleSchema.pre(/^find/, function (next) {
  this.populate('contact_details.city', 'name')
    .populate('vehicle_details.general.brand')
    .populate('vehicle_details.general.category', 'name')
    .populate('vehicle_details.general.extras', 'name')
    .populate('user', 'name -city');
  next();
});

vehicleSchema.method('toClient', function (lang) {
  var obj = this.toObject({ getters: true });
  //Rename fields
  delete obj._id;
  const model = obj.vehicle_details.general.brand.models.find(
    (m) => (m.id = obj.vehicle_details.general.model)
  );
  if (obj.contact_details.city) {
    obj.contact_details.city = obj.contact_details.city.name;
  }
  obj.vehicle_details.general.brand =
    obj.vehicle_details.general.brand.name;
  obj.vehicle_details.general.model = model.name;
  obj.vehicle_details.general.category =
    obj.vehicle_details.general.category.name;
  //obj.vehicle_details.general.extras = obj.vehicle_details.general.extras.name;

  if (lang) {
    if (obj.contact_details.city) {
      obj.contact_details.city = obj.contact_details.city[lang];
    }
    obj.vehicle_details.general.brand =
      obj.vehicle_details.general.brand[lang];
    obj.vehicle_details.general.category =
      obj.vehicle_details.general.category[lang];
    //obj.vehicle_details.general.extras = obj.vehicle_details.general.extras[lang];
  }

  return obj;
});

vehicleSchema.index({
  'ad_details.title': 'text',
  'ad_details.description': 'text',
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
