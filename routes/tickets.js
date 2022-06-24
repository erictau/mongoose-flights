const express = require('express');
const router = express.Router();

// Controller
const ticketsCtrl = require('../controllers/tickets');

// Routes
router.get('/flights/:id/tickets/new', ticketsCtrl.new);
router.post('/flights/:id/tickets', ticketsCtrl.create);
router.delete('/flights/:flightId/tickets/:ticketId', ticketsCtrl.delete)

// Module Export
module.exports = router;