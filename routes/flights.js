var express = require('express');
var router = express.Router();

// Require Controller
const flightsCtrl = require('../controllers/flights');

// Routes
router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);

router.post('/', flightsCtrl.create);

module.exports = router;
