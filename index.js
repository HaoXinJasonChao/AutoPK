"use strict"
const log = console.log;
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static(__dirname + "/pub"));

app.get('/', (req, res) => {
    res.redirect('AutoPK.html');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
})