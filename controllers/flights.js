const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create,
}

function index(req, res) {
    Flight.find({} , function(err, flights) {
        if (err) return res.redirect('/');

        return res.render('flights/index', {
            flights
        })
    })
}

function newFlight(req, res) {
    res.render('flights/new');
}

function create(req,res) {
    console.log(req.body);
    Flight.create(req.body);
    res.redirect('/flights');
}