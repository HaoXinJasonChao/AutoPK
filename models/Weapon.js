const mongoose = require('mongoose');

const WeaponSchema = new mongoose.Schema({
    "武器名": {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    "自身效果": {
        type: WeaponSelfEffectSchema,
        required: true,
        unique: false
    },
    "敌人效果": {
        type: WeaponEnemyEffectSchema,
        required: true,
        unique: false
    }
});


const WeaponSelfEffectSchema = new mongoose.Schema({
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
    }
});

const WeaponEnemyEffectSchema = new mongoose.Schema({
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

const Weapon = mongoose.model("Weapon", WeaponSchema);

module.exports = { Weapon };