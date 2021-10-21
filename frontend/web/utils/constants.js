export const conditions = [
  {
    id: 'used',
    ar: 'سيارات-مستعملة-للبيع',
    fr: 'used-cars-for-sale',
  },
  { id: 'new', ar: 'سيارات-جديدة-للبيع', fr: 'new-cars-for-sale' },
];

export const vehicleSchema = {
  vehicle_details: {
    general: [
      'condition',
      'category',
      'brand',
      'model',
      'year',
      'month',
      'crashed',
      'previous_owners',
      'garanty',
      'origin',
    ],
    engine: [
      'mileage',
      'transmission',
      'fuel_type',
      'power',
      'drive_type',
      'size',
      'consumption',
    ],

    body:
      // Body
      ['extern_color', 'intern_color', 'doors', 'seats', 'interior_type'],
    extras: 'extras',
  },

  // Ad details
  ad_details: ['price', 'is_negociable'],

  // Contact details
  contact_details: ['city'],
};

export const vehiclestructure = {
  vd: 'vehicle_details',
  ad: 'ad_details',
  cd: 'contact_details',
  g: 'general',
  e: 'engine',
  b: 'body',
};
