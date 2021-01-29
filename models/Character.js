const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    "角色名": {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    "波段上限": {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    "波段下限": {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    "功力": {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    "附加波段": {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    "附加伤害": {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    "减伤": {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    "会心几率": {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    "会心伤害": {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    "闪避率": {
        type: Number,
        required: true,
        unique: false,
        trim: true
    }
});

CharacterSchema.statics.findByName = async function(username) {
    const Character = this;
    try {
        const character = await Character.findOne({ "角色名": username });
        if (!character) {
            return false;
        } else {
            return character;
        }
    } catch (err) {
        console.log(err);
    }
};

const Character = mongoose.model("Character", CharacterSchema);

module.exports = { Character };