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
const { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
mongoose.set('bufferCommands', false);
mongoose.set('useFindAndModify', false);

// Import mongoose models
const { Character } = require("./models/Character");
const { Weapon, WeaponSelfEffect, WeaponEnemyEffect } = require("./models/Weapon");
const { Wuxue } = require("./models/Wuxue");
const { Xinfa } = require("./models/Xinfa");

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
function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError";
};

// Middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send('Internal Server Error');
        return;
    } else {
        next();
    }
};


app.get('/', (req, res) => {
    res.render('AutoPK');
})

app.get('/helloworld!', (req, res) => {
    log('helloworld!');
    res.status(200).send({ 'message': 'hello world!' });
});

// Create a new character with the given statistics and no weapon/wuxue/xinfa
app.post('/createCharacter', mongoChecker, async(req, res) => {
    const character = new Character({
        "角色名": req.body.characterName,
        "波段上限": req.body.upperBand,
        "波段下限": req.body.lowerBand,
        "功力": req.body.power,
        "附加波段": req.body.bonusBand,
        "附加伤害": req.body.bonusDamage,
        "减伤": req.body.damageReduction,
        "会心几率": req.body.critChance,
        "会心伤害": req.body.critMultiplier,
        "闪避率": req.body.dodgeChance,
        "武器": "无",
        "武学": [],
        "心法": []
    });

    try {
        const newCharacter = await character.save();
        if (!newCharacter) {
            res.status(500).send({
                "message": "Failed to create new character on server end."
            });
            return;
        } else {
            res.status(200).send({ "message": "Character added." });
        }
    } catch (err) {
        if (isMongoError(err)) {
            res.status(500).send({
                "message": "Database Error."
            });
        } else {
            res.status(400).send({
                "message": "Server error."
            });
        }
    }
});


app.post('/createWeapon', mongoChecker, async(req, res) => {

    const weaponSelfEffect = new WeaponSelfEffect({
        "波段上限": req.body.selfEffect.upperBand,
        "波段下限": req.body.selfEffect.lowerBand,
        "功力": req.body.selfEffect.power,
        "附加伤害": req.body.selfEffect.bonusDamage,
        "减伤": req.body.selfEffect.damageReduction,
        "会心几率": req.body.selfEffect.critChance,
        "会心伤害": req.body.selfEffect.critMultiplier,
        "闪避率": req.body.selfEffect.dodgeChance
    })
    const weaponEnemyEffect = new WeaponEnemyEffect({
        "减对方波段上限": req.body.enemyEffect.upperBand,
        "减对方波段下限": req.body.enemyEffect.lowerBand,
        "减对方功力": req.body.enemyEffect.power,
        "减对方附加伤害": req.body.enemyEffect.bonusDamage,
        "减对方减伤": req.body.enemyEffect.damageReduction,
        "减对方会心几率": req.body.enemyEffect.critChance,
        "减对方会心伤害": req.body.enemyEffect.critMultiplier,
        "减对方闪避率": req.body.enemyEffect.dodgeChance
    })
    const weapon = new Weapon({
        "武器名": req.body.weaponName,
        "自身效果": weaponSelfEffect,
        "敌人效果": weaponEnemyEffect
    });

    try {
        const newWeapon = await weapon.save();
        if (!newWeapon) {
            res.status(500).send({
                "message": "Failed to create new weapon on server end."
            });
            return;
        } else {
            res.status(200).send({ "message": "Weapon added." });
        }
    } catch (err) {
        log(err);
        if (isMongoError(err)) {
            res.status(500).send({
                "message": "Database Error."
            });
        } else {
            res.status(400).send({
                "message": "Server error."
            });
        }
    }
})

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