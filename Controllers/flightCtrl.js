const Flight = require('../Models/flightModel');
const FlightPath = require('../Models/flightPathModel');
const asyncHandler = require('express-async-handler');
const HttpError = require('../utils/httpError');

// @descr  Add Flight
// @route  Post /api/flights/
// @access Private/Admin
exports.addFlight = asyncHandler(async (req, res) => {
  const { flightPath, departureTime, arrivalTime, airline, capacity, availableSeats, price } = req.body;
  const flightPathFound = await FlightPath.findById(flightPath);
  if (!flightPathFound) {
    throw new HttpError(404, 'FlightPath not found');
  }
  const flight = await Flight.create({
    flightPath,
    departureTime,
    arrivalTime,
    airline,
    capacity,
    availableSeats,
    price,
  });

  res.json({
    status: 'success',
    message: 'Flight created successfully',
    flight,
  });
});

// @descr  Get all Flights
// @route  GET /api/flights/
// @access Public
exports.getFlights = asyncHandler(async (req, res) => {
  const flights = await Flight.find({}).populate({
    path: 'flightPath',
  });
  res.json({
    status: 'success',
    count: flights.length,
    data: flights,
  });
});

// @descr  Get single Flight
// @route  GET /api/flights/:id
// @access Public
exports.getFlightById = asyncHandler(async (req, res) => {
  const flight = await Flight.findById(req.params.id).populate({
    path: 'flightPath',
  });
  if (!flight) {
    throw new HttpError(404, 'Flight not found');
  }
  res.json({
    status: 'success',
    data: flight,
  });
});

// @descr  Update Flight
// @route  PUT /api/flights/:id
// @access Private/Admin
exports.updateFlight = asyncHandler(async (req, res) => {
  const { flightPath, departureTime, arrivalTime, airline, capacity, availableSeats, price } = req.body;

  const flight = await Flight.findById(req.params.id);
  if (!flight) {
    throw new HttpError(404, 'Flight not found');
  }

  flight.flightPath = flightPath || flight.flightPath;
  flight.departureTime = departureTime || flight.departureTime;
  flight.arrivalTime = arrivalTime || flight.arrivalTime;
  flight.airline = airline || flight.airline;
  flight.capacity = capacity || flight.capacity;
  flight.availableSeats = availableSeats || flight.availableSeats;
  flight.price = price || flight.price;

  await flight.save();

  if (flightPath) {
    const flightPath = await FlightPath.findById(flightPath);
    if (!flightPath) {
      throw new HttpError(404, 'FlightPath not found');
    }
  }

  res.json({
    status: 'success',
    message: 'Flight updated successfully',
    flight,
  });
});

// @descr  Delete Flight
// @route  DELETE /api/flights/:id
// @access Private/Admin
exports.deleteFlight = asyncHandler(async (req, res) => {
  await Flight.findByIdAndDelete(req.params.id);

  res.json({
    status: 'success',
    message: 'Flight deleted successfully',
  });
});

// @descr  Get flight prices for a given flightPath and date
// @route  POST /api/flights/prices
// @access Public
exports.getFlightPrices = asyncHandler(async (req, res) => {
  const { origin, destination, date } = req.body;

  // Get flights matching the origin, destination and date
  const startDate = new Date(`${date}T00:00:00.000Z`);
  const endDate = new Date(`${date}T23:59:59.999Z`);

  const flights = await Flight.find({
    departureTime: { $gte: startDate, $lte: endDate },
  }).populate({
    path: 'flightPath',
    match: {
      origin,
      destination,
    },
  });

  // Group the flights by airline and find the minimum price for each airline
  const airlines = flights.reduce((acc, flight) => {
    const airline = flight.airline;
    const price = flight.price;
    if (!acc[airline]) {
      acc[airline] = price;
    } else {
      acc[airline] = Math.min(acc[airline], price);
    }
    return acc;
  }, {});

  // Format the output
  const formattedPrices = {};
  for (const [airline, price] of Object.entries(airlines)) {
    formattedPrices[airline] = `₹${price.toLocaleString('en-IN')}`;
  }

  res.json({
    status: 'success',
    data: formattedPrices,
  });
});
