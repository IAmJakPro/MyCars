const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: { type: String, required: true, min: 10, max: 10 },
    city: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'City',
    },
  },
  {
    timestamps: true,
  }
);

// Document middleware, only works on save() and create()!
// Doesn't work on update() and insert()!
userSchema.pre('save', async function (next) {
  // Only run the encryption if the password is modified.
  if (!this.isModified('password')) {
    return next();
  }

  // Encrypt the password with BCRYPT Algorithm.
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate('city');
  next();
});

userSchema.method('toClient', function (lang) {
  const obj = this.toObject({ getters: true });

  if (obj.city) {
    obj.city = obj.city.name;
    if (lang) {
      obj.city = obj.city[lang];
    }
  }

  //Rename fields
  delete obj._id;

  return obj;
});

userSchema.methods.isPasswordCorrect = async function (
  password,
  userPassword
) {
  return await bcrypt.compare(password, userPassword);
};

userSchema.index({
  name: 'text',
  email: 'text',
  'city.name.fr': 'text',
  'city.name.ar': 'text',
  phone: 'text',
});

module.exports = mongoose.model('User', userSchema);
