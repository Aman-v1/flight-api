const express = require('express');
const {
  addFlightPath,
  getFlightPaths,
  getFlightPathById,
  updateFlightPath,
  deleteFlightPath,
} = require('../Controllers/flightPathCtrl');
const { isLoggedIn } = require('../Middlewares/isLoggedIn');
const { isAdmin } = require('../Middlewares/isAdmin');

const router = express.Router();

router.post('/', isLoggedIn, isAdmin, addFlightPath);
router.get('/', getFlightPaths);
router.get('/:id', getFlightPathById);
router.put('/:id', isLoggedIn, isAdmin, updateFlightPath);
router.delete('/:id', isLoggedIn, isAdmin, deleteFlightPath);

module.exports = router;
