const express = require('express');
const router = express.Router();

// Controller
const ticketsCtrl = require('../controllers/tickets');

// Routes
router.get('/flights/:id/tickets/new', ticketsCtrl.new);
router.post('/flights/:id/tickets', ticketsCtrl.create);

// Module Export
module.exports = router;