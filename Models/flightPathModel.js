const mongoose = require('mongoose');

const FlightPathSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FlightPath = mongoose.model('FlightPath', FlightPathSchema);

module.exports = FlightPath;
