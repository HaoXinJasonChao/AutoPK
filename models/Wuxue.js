const mongoose = require('mongoose');




const WuxueSelfEffectSchema = new mongoose.Schema({
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
    "回血": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "封技几率": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    }
});

const WuxueEnemyEffectSchema = new mongoose.Schema({
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
    },
    "减对方HP": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "封技几率": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    }
});

const WuxueNextRoundEffectSchema = new mongoose.Schema({
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
    "回血": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "封技几率": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    }
});

const WuxueNextRoundEnemyEffectSchema = new mongoose.Schema({
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
    },
    "减对方HP": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "封技几率": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    }
});

const WuxuePermaEnemyEffectSchema = new mongoose.Schema({
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
    },
    "减对方hp": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "封技几率": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    }
});

const WuxueSpecialAttackModeSchema = new mongoose.Schema({
    "吸血": {
        type: Boolean,
        required: false,
        unique: false,
        trim: true
    },
    "吸血比例": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    },
    "互伤": {
        type: Boolean,
        required: false,
        unique: false,
        trim: true
    },
    "互冲": {
        type: Boolean,
        required: false,
        unique: false,
        trim: true
    },
    "反弹": {
        type: Boolean,
        required: false,
        unique: false,
        trim: true
    },
    "功力反弹比率": {
        type: Number,
        required: false,
        unique: false,
        trim: true
    }
});
const WuxueSchema = new mongoose.Schema({
    "武学名": {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    "本回合自身效果": {
        type: WuxueSelfEffectSchema,
        required: true,
        unique: false
    },
    "本回合敌人效果": {
        type: WuxueEnemyEffectSchema,
        required: true,
        unique: false
    },
    "下回合自身效果": {
        type: WuxueNextRoundEffectSchema,
        required: true,
        unique: false
    },
    "下回合敌人效果": {
        type: WuxueNextRoundEnemyEffectSchema,
        required: true,
        unique: false
    },
    "敌人持续效果": {
        type: WuxuePermaEnemyEffectSchema,
        required: true,
        unique: false
    },
    "特殊攻击模式": {
        type: WuxueSpecialAttackModeSchema,
        required: true,
        unique: false
    }
});

WuxueSchema.statics.findByName = async function(wuxueName) {
    const Wuxue = this;
    try {
        const wuxue = await Wuxue.findOne({ "武学名": wuxueName });
        if (!wuxue) {
            return false;
        } else {
            return wuxue;
        }
    } catch (err) {
        console.log(err);
    }
};

const Wuxue = mongoose.model("Wuxue", WuxueSchema);
const WuxueSelfEffect = mongoose.model("WuxueSelfEffect",
    WuxueSelfEffectSchema);
const WuxueEnemyEffect = mongoose.model("WuxueEnemyEffect",
    WuxueEnemyEffectSchema);
const WuxueNextRoundEffect = mongoose.model("WuxueNextRoundEffect",
    WuxueNextRoundEffectSchema);
const WuxueNextRoundEnemyEffect = mongoose.model("WuxueNextRoundEnemyEffect",
    WuxueNextRoundEnemyEffectSchema);
const WuxuePermaEnemyEffect = mongoose.model("WuxuePermaEnemyEffect",
    WuxuePermaEnemyEffectSchema);
const WuxueSpecialAttackMode = mongoose.model("WuxueSpecialAttackMode",
    WuxueSpecialAttackModeSchema)

module.exports = {
    Wuxue,
    WuxueSelfEffect,
    WuxueEnemyEffect,
    WuxueNextRoundEffect,
    WuxueNextRoundEnemyEffect,
    WuxuePermaEnemyEffect,
    WuxueSpecialAttackMode
};