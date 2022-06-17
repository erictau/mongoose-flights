var express = require('express');
var router = express.Router();

// Require Controller
const flightsCtrl = require('../controllers/flights');

// Routes
router.get('/', flightsCtrl.index);


module.exports = router;
