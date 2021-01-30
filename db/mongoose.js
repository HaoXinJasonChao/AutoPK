'use strict';

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Jason:Os4RIu7tX9DFnTxd@pk-data.n0d7p.mongodb.net/PK-Data?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).catch((err) => {
    console.log('Error connecting to mongodb. Timeout reached.');
});

module.exports = { mongoose };