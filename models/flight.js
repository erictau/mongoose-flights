const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest' ,'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
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
            console.log(currDate, "CURRENT DATE")
            const futureDate = new Date(currDate.getFullYear() + 1, currDate.getMonth(), currDate.getDate())
            console.log(futureDate, "FUTURE DATE")
            return futureDate;
        }
    },
})

module.exports = mongoose.model('Flight', flightSchema);