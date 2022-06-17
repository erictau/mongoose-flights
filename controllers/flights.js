const Flight = require('../models/flight');

module.exports = {
    index,
}

function index(req, res) {
    Flight.find({} , function(err, flights) {
        if (err) return res.redirect('/');

        return res.render('flights/index', {
            flights
        })
    })
}