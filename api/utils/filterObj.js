const filterObj = (obj, toAllow = true, ...allowedFields) => {
  const newObject = {};

  // If the current field is one of the allowed fields?
  // Then, new object with the field name of the current field, should be equal.
  // Equal to what? Equal to whatever it is in the object, at the current field.
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObject[el] = obj[el];
    }
  });

  return newObject;
};

module.exports = filterObj;
