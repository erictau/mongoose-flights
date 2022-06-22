const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Variables
const airports = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'];

// Schemas
const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: airports
    },
    arrival: Date,
})

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest' ,'United']
    },
    airport: {
        type: String,
        enum: airports,
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            const currDate = new Date();
            const futureDate = new Date(currDate.getFullYear() + 1, currDate.getMonth(), currDate.getDate())
            return futureDate;
        }
    },
    destinations: [destinationSchema]
})

module.exports = mongoose.model('Flight', flightSchema);