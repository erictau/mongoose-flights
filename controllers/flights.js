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
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate });
}

function create(req,res) {
    console.log(req.body);
    for (let prop in req.body) {
        if (req.body[prop] === '') delete req.body[prop];
    }
    Flight.create(req.body);
    res.redirect('/flights');
}