const FlightPath = require('../Models/flightPathModel');
const asyncHandler = require('express-async-handler');
const HttpError = require('../utils/httpError');

// @descr  Add FlightPath
// @route  Post /api/flightPath/
// @access Private/Admin
exports.addFlightPath = asyncHandler(async (req, res) => {
  const { origin, destination, distance } = req.body;
  //flightPath already exists
  const flightPathFound = await FlightPath.findOne({ origin });
  if (flightPathFound?.destination === destination) {
    throw new HttpError(409, 'FlightPath already exists');
  }
  //create
  const flightPath = await FlightPath.create({
    origin,
    destination,
    distance,
  });

  res.status(201).json({
    status: 'success',
    message: 'FlightPath created successfully',
    flightPath,
  });
});

// @descr  Get all FlightPaths
// @route  GET /api/flightPath/
// @access Public
exports.getFlightPaths = asyncHandler(async (req, res) => {
  const flightPaths = await FlightPath.find({});
  res.status(200).json({
    status: 'success',
    count: flightPaths.length,
    data: flightPaths,
  });
});

// @descr  Get single FlightPath
// @route  GET /api/flightPath/:id
// @access Public
exports.getFlightPathById = asyncHandler(async (req, res) => {
  const flightPath = await FlightPath.findById(req.params.id);

  if (!flightPath) {
    throw new HttpError(404, 'FlightPath not found');
  }

  res.status(200).json({
    status: 'success',
    data: flightPath,
  });
});

// @descr  Update FlightPath
// @route  PUT /api/flightPath/:id
// @access Private/Admin
exports.updateFlightPath = asyncHandler(async (req, res) => {
  const { origin, destination, distance } = req.body;

  const updatedFlightPath = await FlightPath.findByIdAndUpdate(
    req.params.id,
    { origin, destination, distance },
    { new: true, runValidators: true }
  );

  if (!updatedFlightPath) {
    throw new HttpError(404, 'FlightPath not found');
  }

  res.status(200).json({
    status: 'success',
    message: 'FlightPath updated successfully',
    flightPath: updatedFlightPath,
  });
});

// @descr  Delete FlightPath
// @route  DELETE /api/flightPath/:id
// @access Private/Admin
exports.deleteFlightPath = asyncHandler(async (req, res) => {
  await FlightPath.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    message: 'FlightPath deleted successfully',
  });
});
