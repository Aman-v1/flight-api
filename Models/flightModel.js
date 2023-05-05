const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema(
  {
    flightPath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FlightPath',
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    airline: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

FlightSchema.virtual('travelTime').get(function () {
  // Calculate travel time in minutes
  const travelTimeMs = this.arrivalTime - this.departureTime;
  return Math.round(travelTimeMs / (1000 * 60));
});

const Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;
