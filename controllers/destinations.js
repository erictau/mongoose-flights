const Flight = require('../models/flight');

module.exports = {
    create
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        if (err) res.redirect(`/flights`);
        // Can only add destinations with arrival dates that come after a given flight's departs date.
        req.body.arrival = new Date(req.body.arrival);
        if (flight.departs > req.body.arrival) return res.redirect(`/flights/${req.params.id}`);

        flight.destinations.push(req.body);
        flight.destinations.sort((a, b) => a.arrival -  b.arrival);
        flight.save(function(err) {
            if (err) res.redirect(`/flights`);
            res.redirect(`/flights/${req.params.id}`)
        });
    })
}

