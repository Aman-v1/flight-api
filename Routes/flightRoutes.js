const express = require('express');
const {
  addFlight,
  getFlightById,
  getFlights,
  updateFlight,
  deleteFlight,
  getFlightPrices,
} = require('../Controllers/flightCtrl');
const { isLoggedIn } = require('../Middlewares/isLoggedIn');
const { isAdmin } = require('../Middlewares/isAdmin');

const router = express.Router();

router.post('/', isLoggedIn, isAdmin, addFlight);
router.get('/', getFlights);
router.get('/prices', getFlightPrices);
router.get('/:id', getFlightById);
router.put('/:id', isLoggedIn, isAdmin, updateFlight);
router.delete('/:id', isLoggedIn, isAdmin, deleteFlight);

module.exports = router;
