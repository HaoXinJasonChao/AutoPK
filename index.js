"use strict"

const express = require("express");

const app = express();

const PORT = express.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
})