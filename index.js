'use strict';
const log = console.log;

// Express
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Mongo and Mongoose
// const { mongoose } = require('./db/mongoose');
// const { ObjectID } = require('mongodb');
// mongoose.set('bufferCommands', false);
// mongoose.set('useFindAndModify', false);


// handlebars server-side templating engine
const exphbs = require('express-handlebars');
// Disable the default layout and change the default handlebars extension to '.html' for simplicity
const hbs = exphbs.create({
    defaultLayout: null,
    extname: '.html'
});
// Register the engine
app.engine('.html', hbs.engine);
// Set the view engine to use the 
app.set('view engine', '.html');
// Change the handlebars directory from '/views' (default) to '/public'
app.set('views', path.join(__dirname, '/public'));

// Helper function which checks for the error returned by the promise rejection if Mongo database suddently disconnects
// function isMongoError(error) {
//     return typeof error === 'object' && error !== null && error.name === "MongoNetworkError";
// };

// Middleware for mongo connection error for routes that need it
// const mongoChecker = (req, res, next) => {
//     // check mongoose connection established.
//     if (mongoose.connection.readyState != 1) {
//         log('Issue with mongoose connection');
//         res.status(500).send('Internal Server Error');
//         return;
//     } else {
//         next();
//     }
// };

app.get('/', (req, res) => {
    res.render('AutoPK');
})

app.get('/helloworld!', (req, res) => {
    log('helloworld!');
    res.status(200).send({ 'message': 'hello world!' });
});

// Set up the routes for the '/css', and '/js' static directories
app.use("/css", express.static(path.join(__dirname, '/public/css')));
app.use("/js", express.static(path.join(__dirname, '/public/js')));

// redirect to autopk
// app.get('*', (req, res) => {
//     res.redirect('/');
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`listening on ${port}...`);
});