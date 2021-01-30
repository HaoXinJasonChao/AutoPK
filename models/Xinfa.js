const mongoose = require('mongoose');



const XinfaSelfEffectSchema = new mongoose.Schema({
    "波段上限": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "波段下限": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "附加伤害": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "减伤": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "功力": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "会心几率": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "会心伤害": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "闪避率": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "回复hp": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    }
});

const XinfaEnemyEffectSchema = new mongoose.Schema({
    "减对方波段上限": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "减对方波段下限": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "减对方附加伤害": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "减对方减伤": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "减对方功力": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "减对方会心几率": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "减对方会心伤害": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "减对方闪避率": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    }
});

const XinfaSchema = new mongoose.Schema({
    "心法名": {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    "自身效果": {
        type: XinfaSelfEffectSchema,
        required: true,
        unique: false
    },
    "敌人效果": {
        type: XinfaEnemyEffectSchema,
        required: true,
        unique: false
    }
});

XinfaSchema.statics.findByName = async function(xinfaName) {
    const Xinfa = this;
    try {
        const xinfa = await Xinfa.findOne({ "心法名": xinfa });
        if (!xinfa) {
            return false;
        } else {
            return xinfa;
        }
    } catch (err) {
        console.log(err);
    }
};
const Xinfa = mongoose.model("Xinfa", XinfaSchema);
const XinfaSelfEffect = mongoose.model("XinfaSelfEffect", XinfaSelfEffectSchema);
const XinfaEnemyEffect = mongoose.model("XinfaEnemyEffect", XinfaEnemyEffectSchema);


module.exports = { Xinfa, XinfaSelfEffect, XinfaEnemyEffect };