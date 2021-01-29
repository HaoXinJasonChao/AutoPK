'use strict';

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Jason:e71yLpAhPCD0R5kH@pk-data.n0d7p.mongodb.net/test?';

mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).catch((err) => {
    console.log('Error connecting to mongodb. Timeout reached.');
});

module.exports = { mongoose };