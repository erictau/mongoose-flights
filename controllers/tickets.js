const Flight = require('../models/flight');
const Ticket = require('../models/ticket');
const mongoose = require('mongoose');

module.exports = {
    new: newTicket,
    create,
}

function newTicket(req, res) {
    res.render('tickets/new', {title: 'New Ticket', id: req.params.id});
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        req.body.flight = flight._id;
        const ticket = new Ticket(req.body)
        ticket.save(function(err) {
            if (err) console.log('Error');
            res.redirect(`/flights/${req.params.id}`);
        });
    })
}