const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
}

function index(req, res) {
    Flight.find({} , function(err, flights) {
        if (err) return res.redirect('/');
        const currDate = new Date();
        return res.render('flights/index', {
            title: 'Flights', flights, currDate, 
        })
    }).sort('departs');
}

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { 
        title: 'New Flight', departsDate 
    });
}

function create(req, res) {
    for (let prop in req.body) {
        if (req.body[prop] === '') delete req.body[prop];
    }
    Flight.create(req.body);
    res.redirect('/flights');
}

function show(req, res) {
    let tickets = []
    Flight.findById(req.params.id, function(err, flight) {
        if (err) return res.redirect('/flights')

        // Identify airports that have not been visited.
        const remainingAirports = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'];
        
        const airportsVisited = [];
        airportsVisited.push(flight.airport);
        flight.destinations.forEach(destination => airportsVisited.push(destination.airport));

        airportsVisited.forEach(visited => {
            let i = remainingAirports.findIndex(remaining => remaining === visited);
            if (i !== -1) remainingAirports.splice(i, 1);
        });

        // Tickets
        Ticket.find({flight: flight._id}, function(err, flightTickets) {
            flightTickets.forEach(ticket => {
                tickets.push(ticket.seat)
            });

            // Title
            flight.flightNo ? title = `${flight.airline} ${flight.flightNo}` :  title = 'Flight Details';
    
            res.render('flights/show', {
                title, flight, remainingAirports, tickets
            });

        }).sort('seat');
    });
}