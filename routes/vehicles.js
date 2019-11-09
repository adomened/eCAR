const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const vehiclesController = require('../controllers/vehiclesController');

router.post('/reserve', passport.authenticate('jwt', { session: false}), vehiclesController.reserve);

router.post('/', passport.authenticate('jwt', { session: false}), vehiclesController.root);

router.post('/get-vehicle/:id', passport.authenticate('jwt', { session: false}), vehiclesController.getVehiclebyId);

module.exports = router;
