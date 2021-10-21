// Entities should be an enum of: 'vehicles', 'rooms', or 'test'.
export default {
  homepage: '/',
  //roomDetail: (roomSlug) => `/rooms/${roomSlug}`,

  // User
  login: '/login',
  register: '/register',
  profile: '/profile',

  // Cars
  newCar: '/cars/add/vehicle_details',
  cars: '/cars',
  carDetails: (carSlug) => `/cars/${carSlug}`,
  myCars: '/my-cars',

  unauthorized: '/unauthorized',
};
