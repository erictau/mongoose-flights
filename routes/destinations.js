var express = require('express');
var router = express.Router();

// Controller
const destinationCtrl = require('../controllers/destinations');

// Routes
router.post('/flights/:id/destinations', destinationCtrl.create);

// Module Export
module.exports = router