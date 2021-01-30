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
const {
    Wuxue,
    WuxueSelfEffect,
    WuxueEnemyEffect,
    WuxueNextRoundEffect,
    WuxueNextRoundEnemyEffect,
    WuxuePermaEnemyEffect,
    WuxueSpecialAttackMode
} = require("./models/Wuxue");
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

// render the webpage
app.get('/', (req, res) => {
    res.render('AutoPK');
})

app.get('/helloworld!', (req, res) => {
    log('helloworld!');
    res.status(200).send({ 'message': 'hello world!' });
});

// Create a new character with the given statistics and no weapon/wuxue/xinfa
app.post('/createCharacter', mongoChecker, async(req, res) => {

    Character.findByName(req.body.characterName).then((character) => {
        if (character) {
            res.status(200).send({
                "message": "角色已存在."
            });
            return;
        } else {
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
                "武学": ['普通攻击'],
                "心法": []
            });

            try {
                character.save().then((newCharacter) => {
                    if (!newCharacter) {
                        res.status(500).send({
                            "message": "服务器错误，无法添加角色。"
                        });
                        return;
                    } else {
                        res.status(200).send({ "message": `角色${req.body.characterName}已添加。` });
                    }
                });
            } catch (err) {
                if (isMongoError(err)) {
                    res.status(500).send({
                        "message": "数据库错误。"
                    });
                } else {
                    res.status(400).send({
                        "message": "服务器错误"
                    });
                }
            }
        }
    });
    // const character = new Character({
    //     "角色名": req.body.characterName,
    //     "波段上限": req.body.upperBand,
    //     "波段下限": req.body.lowerBand,
    //     "功力": req.body.power,
    //     "附加波段": req.body.bonusBand,
    //     "附加伤害": req.body.bonusDamage,
    //     "减伤": req.body.damageReduction,
    //     "会心几率": req.body.critChance,
    //     "会心伤害": req.body.critMultiplier,
    //     "闪避率": req.body.dodgeChance,
    //     "武器": "无",
    //     "武学": [],
    //     "心法": []
    // });

    // try {
    //     const newCharacter = await character.save();
    //     if (!newCharacter) {
    //         res.status(500).send({
    //             "message": "服务器错误，无法添加角色。"
    //         });
    //         return;
    //     } else {
    //         res.status(200).send({ "message": `角色${req.body.characterName}已添加。` });
    //     }
    // } catch (err) {
    //     if (isMongoError(err)) {
    //         res.status(500).send({
    //             "message": "数据库错误。"
    //         });
    //     } else {
    //         res.status(400).send({
    //             "message": "服务器错误"
    //         });
    //     }
    // }

});


// create a weapon
app.post('/createWeapon', mongoChecker, async(req, res) => {
    Weapon.findByName(req.body.weaponName).then((weapon) => {
        if (weapon) {
            res.status(200).send({
                "message": "武器已存在。"
            });
            return;
        } else {
            const weaponSelfEffect = new WeaponSelfEffect({
                "波段上限": req.body.selfEffect.upperBand,
                "波段下限": req.body.selfEffect.lowerBand,
                "功力": req.body.selfEffect.power,
                "附加伤害": req.body.selfEffect.bonusDamage,
                "减伤": req.body.selfEffect.damageReduction,
                "会心几率": req.body.selfEffect.critChance,
                "会心伤害": req.body.selfEffect.critMultiplier,
                "闪避率": req.body.selfEffect.dodgeChance,
                "吸血": req.body.selfEffect.lifeSteal,
                "吸血比例": req.body.selfEffect.lifeStealPercent
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
                weapon.save().then((newWeapon) => {
                    if (!newWeapon) {
                        res.status(500).send({
                            "message": "服务器错误，无法添加武器。"
                        });
                        return;
                    } else {
                        res.status(200).send({ "message": `武器${req.body.weaponName}已添加。` });
                    }
                });
            } catch (err) {
                log(err);
                if (isMongoError(err)) {
                    res.status(500).send({
                        "message": "数据库错误。"
                    });
                } else {
                    res.status(400).send({
                        "message": "服务器错误."
                    });
                }
            }
        }
    });

});

// Create a wuxue
app.post('/createWuxue', mongoChecker, async(req, res) => {
    Wuxue.findByName(req.body.武学名).then((武学) => {
        if (武学) {
            res.status(200).send({
                "message": "武学已存在。"
            });
            return;
        } else {
            const 本回合自身效果 = new WuxueSelfEffect({
                "波段上限": req.body.本回合自身效果.波段上限,
                "波段下限": req.body.本回合自身效果.波段下限,
                "功力": req.body.本回合自身效果.功力,
                "附加伤害": req.body.本回合自身效果.附加伤害,
                "减伤": req.body.本回合自身效果.减伤,
                "会心几率": req.body.本回合自身效果.会心几率,
                "会心伤害": req.body.本回合自身效果.会心伤害,
                "闪避率": req.body.本回合自身效果.闪避率,
                "回血": req.body.本回合自身效果.回血,
                "封技几率": req.body.本回合自身效果.封技几率
            });
            const 本回合敌人效果 = new WuxueEnemyEffect({
                "减对方波段上限": req.body.本回合敌人效果.减对方波段上限,
                "减对方波段下限": req.body.本回合敌人效果.减对方波段下限,
                "减对方功力": req.body.本回合敌人效果.减对方功力,
                "减对方附加伤害": req.body.本回合敌人效果.减对方附加伤害,
                "减对方减伤": req.body.本回合敌人效果.减对方减伤,
                "减对方会心几率": req.body.本回合敌人效果.减对方会心几率,
                "减对方会心伤害": req.body.本回合敌人效果.减对方会心伤害,
                "减对方闪避率": req.body.本回合敌人效果.减对方闪避率,
                "减对方HP": req.body.本回合敌人效果.减对方HP,
                "封技几率": req.body.本回合敌人效果.封技几率
            });
            const 下回合自身效果 = new WuxueNextRoundEffect({
                "波段上限": req.body.下回合自身效果.波段上限,
                "波段下限": req.body.下回合自身效果.波段下限,
                "功力": req.body.下回合自身效果.功力,
                "附加伤害": req.body.下回合自身效果.附加伤害,
                "减伤": req.body.下回合自身效果.减伤,
                "会心几率": req.body.下回合自身效果.会心几率,
                "会心伤害": req.body.下回合自身效果.会心伤害,
                "闪避率": req.body.下回合自身效果.闪避率,
                "回血": req.body.下回合自身效果.回血,
                "封技几率": req.body.下回合自身效果.封技几率
            });
            const 下回合敌人效果 = new WuxueNextRoundEnemyEffect({
                "减对方波段上限": req.body.下回合敌人效果.减对方波段上限,
                "减对方波段下限": req.body.下回合敌人效果.减对方波段下限,
                "减对方功力": req.body.下回合敌人效果.减对方功力,
                "减对方附加伤害": req.body.下回合敌人效果.减对方附加伤害,
                "减对方减伤": req.body.下回合敌人效果.减对方减伤,
                "减对方会心几率": req.body.下回合敌人效果.减对方会心几率,
                "减对方会心伤害": req.body.下回合敌人效果.减对方会心伤害,
                "减对方闪避率": req.body.下回合敌人效果.减对方闪避率,
                "减对方HP": req.body.下回合敌人效果.减对方HP,
                "封技几率": req.body.下回合敌人效果.封技几率
            });
            const 敌人持续效果 = new WuxuePermaEnemyEffect({
                "减对方波段上限": req.body.敌人持续效果.减对方波段上限,
                "减对方波段下限": req.body.敌人持续效果.减对方波段下限,
                "减对方功力": req.body.敌人持续效果.减对方功力,
                "减对方附加伤害": req.body.敌人持续效果.减对方附加伤害,
                "减对方减伤": req.body.敌人持续效果.减对方减伤,
                "减对方会心几率": req.body.敌人持续效果.减对方会心几率,
                "减对方会心伤害": req.body.敌人持续效果.减对方会心伤害,
                "减对方闪避率": req.body.敌人持续效果.减对方闪避率,
                "减对方HP": req.body.敌人持续效果.减对方HP,
                "封技几率": req.body.敌人持续效果.封技几率
            });
            const 特殊攻击模式 = new WuxueSpecialAttackMode({
                "吸血": req.body.特殊攻击模式.吸血,
                "吸血比例": req.body.特殊攻击模式.吸血比例,
                "互伤": req.body.特殊攻击模式.互伤,
                "互冲": req.body.特殊攻击模式.互冲,
                "反弹": req.body.特殊攻击模式.反弹,
                "功力反弹比率": req.body.特殊攻击模式.功力反弹比率
            })
            const 新武学 = new Wuxue({
                "武学名": req.body.武学名,
                "本回合自身效果": 本回合自身效果,
                "本回合敌人效果": 本回合敌人效果,
                "下回合自身效果": 下回合自身效果,
                "下回合敌人效果": 下回合敌人效果,
                "敌人持续效果": 敌人持续效果,
                "特殊攻击模式": 特殊攻击模式
            })
            try {
                新武学.save().then((保存武学) => {
                    if (!保存武学) {
                        res.status(500).send({
                            "message": "服务器错误，无法添加武学。"
                        });
                        return;
                    } else {
                        res.status(200).send({ "message": `武学${req.body.武学名}已添加。` });
                    }
                });
            } catch (err) {
                log(err);
                if (isMongoError(err)) {
                    res.status(500).send({
                        "message": "数据库错误。"
                    });
                } else {
                    res.status(400).send({
                        "message": "服务器错误."
                    });
                }
            }
        }
    });
});

// A character equips/unequips a weapon
app.post('/equipWeapon', mongoChecker, async(req, res) => {
    Character.findByName(req.body.角色名).then((角色) => {
        if (!角色) {
            res.status(200).send({
                "message": "角色不存在。"
            });
            return;
        } else {
            Weapon.findByName(req.body.武器名).then((武器) => {
                if (!武器) {
                    res.status(200).send({
                        "message": "武器不存在。"
                    });
                    return;
                } else {
                    if (req.body.卸下) {
                        角色.武器 = "无";
                    } else {
                        角色.武器 = req.body.武器名;
                    }
                    角色.save().then((保存成功) => {
                        if (!保存成功) {
                            res.status(500).send({
                                "message": "服务器错误，无法装备武器。"
                            });
                            return;
                        } else {
                            if (req.body.卸下) {
                                res.status(200).send({ "message": `${req.body.角色名}已卸下武器。` });
                            } else {
                                res.status(200).send({ "message": `${req.body.角色名}已装备${req.body.武器名}。` });
                            }

                        }
                    })
                }
            })
        }
    })
});

// A character learns/forgets a wuxue
app.post('/learnWuxue', mongoChecker, async(req, res) => {
    Character.findByName(req.body.角色名).then((角色) => {
        if (!角色) {
            res.status(200).send({
                "message": "角色不存在。"
            });
            return;
        } else {
            Wuxue.findByName(req.body.武学名).then((武学) => {
                if (!武学) {
                    res.status(200).send({
                        "message": "武学不存在。"
                    });
                    return;
                } else {
                    if (req.body.忘记) {
                        if (!角色.武学.includes(req.body.武学名)) {
                            res.status(200).send({ "message": `${req.body.角色名}不会${req.body.武学名}，无法忘记。` });
                            return;
                        } else {
                            角色.武学 = 角色.武学.filter(wuxue => wuxue !== req.body.武学名);
                        }
                    } else {
                        if (角色.武学.includes(req.body.武学名)) {
                            res.status(200).send({ "message": `${req.body.角色名}本来就会${req.body.武学名}，无法重复学习。` });
                            return;
                        } else {
                            角色.武学.push(req.body.武学名);
                        }
                    }
                    角色.save().then((保存成功) => {
                        if (!保存成功) {
                            res.status(500).send({
                                "message": "服务器错误，无法装备武器。"
                            });
                            return;
                        } else {
                            if (req.body.忘记) {
                                res.status(200).send({ "message": `${req.body.角色名}已忘记${req.body.武学名}。` });
                            } else {
                                res.status(200).send({ "message": `${req.body.角色名}已学会${req.body.武学名}。` });
                            }

                        }
                    })
                }
            })
        }
    })
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
    log(`listening on ${ port }... `);
});