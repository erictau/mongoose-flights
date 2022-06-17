const mongoose = require('mongoose');
const Schema = mongoose.Schema();

mongoose.connect('mongodb://localhost:27017/flights');

const db = mongoose.connection;

db.on('connected', () => console.log(`Connected to MongoDB at ${db.host}: ${db.port}`));