const log = console.log;

function openPage(pageName) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    // tablinks = document.getElementsByClassName("tablink");
    // for (i = 0; i < tablinks.length; i++) {
    //     tablinks[i].style.backgroundColor = "";
    // }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultTab").click();
document.getElementById('calculateCombat').addEventListener("click", () => {
    fetchRequest("GET", '/helloworld!', {}, (data) => {
        log(data.message);
    });
});

// Submit info to create new character
document.getElementById('characterAddForm').addEventListener("submit", function(e) {
    e.preventDefault();
    const characterName = getString('newCharacterName');
    if (characterName == "") {
        alert("角色名空缺");
        return;
    }
    const upperBand = getInt('newCharacterUpperBand');
    const lowerBand = getInt('newCharacterLowerBand');
    const power = getInt('newCharacterPower');
    const bandBonus = getInt('newCharacterBandBonus');
    const damageBonus = getInt('newCharacterDMGBonus');
    const damageReduction = getInt('newCharacterDMGReduction');
    const critChance = getFloat('newCharacterCritChance');
    const critMultiplier = getFloat('newCharacterCritMultiplier');
    const dodgeChance = getFloat('newCharacterDodgeChance');

    fetchRequest("POST", '/createCharacter', {
        "characterName": characterName,
        "upperBand": upperBand,
        "lowerBand": lowerBand,
        "power": power,
        "bonusBand": bandBonus,
        "bonusDamage": damageBonus,
        "damageReduction": damageReduction,
        "critChance": critChance,
        "critMultiplier": critMultiplier,
        "dodgeChance": dodgeChance
    }, (message) => {
        alert(message.message);
    });
    return;
});

// Submit info to create new weapon
document.getElementById('addWeaponForm').addEventListener("submit", function(e) {
    e.preventDefault();
    const weaponName = getString('weaponName');
    if (weaponName == "") {
        alert("武器名空缺！");
        return;
    }
    const upperBand = getInt('weaponUpperBand');
    const lowerBand = getInt('weaponLowerBand');
    const power = getInt('weaponPowerBonus');
    const damageBonus = getInt('weaponDMGBonus');
    const damageReduction = getInt('weaponDMGReduction');
    const critChance = getFloat('weaponCritChance');
    const critMultiplier = getFloat('weaponCritMultiplier');
    const dodgeChance = getFloat('weaponDodgeChance');
    const lifeSteal = getBool('weaponLifeSteal');
    const lifeStealPercent = getFloat('weaponLifeStealPercent');

    const upperBandNegative = getInt('weaponNegativeUpperBand');
    const lowerBandNegative = getInt('weaponNegativeLowerBand');
    const powerNegative = getInt('weaponNegativePowerBonus');
    const damageBonusNegative = getInt('weaponNegativeDMGBonus');
    const damageReductionNegative = getInt('weaponNegativeDMGReduction');
    const critChanceNegative = getFloat('weaponNegativeCritChance');
    const critMultiplierNegative = getFloat('weaponNegativeCritMultiplier');
    const dodgeChanceNegative = getFloat('weaponNegativeDodgeChance');

    fetchRequest("POST", '/createWeapon', {
        "weaponName": weaponName,
        "selfEffect": {
            "upperBand": upperBand,
            "lowerBand": lowerBand,
            "power": power,
            "bonusDamage": damageBonus,
            "damageReduction": damageReduction,
            "critChance": critChance,
            "critMultiplier": critMultiplier,
            "dodgeChance": dodgeChance,
            "lifeSteal": lifeSteal,
            "lifeStealPercent": lifeSteal ? lifeStealPercent : 0.0
        },
        "enemyEffect": {
            "upperBand": upperBandNegative,
            "lowerBand": lowerBandNegative,
            "power": powerNegative,
            "bonusDamage": damageBonusNegative,
            "damageReduction": damageReductionNegative,
            "critChance": critChanceNegative,
            "critMultiplier": critMultiplierNegative,
            "dodgeChance": dodgeChanceNegative
        }
    }, (message) => {
        alert(message.message);
    });
    return;
});


document.getElementById('addSkillForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const 武学名 = getString('skillName');
    const 本回合自身效果 = {
        "波段上限": getInt('skillUpperBand'),
        "波段下限": getInt('skillLowerBand'),
        "附加伤害": getInt('skillDMGBonus'),
        "减伤": getInt('skillDMGReduction'),
        "功力": getInt('skillPowerBonus'),
        "会心几率": getFloat('skillCritChance'),
        "会心伤害": getFloat('skillCritMultiplier'),
        "闪避率": getFloat('skillDodgeChance'),
        "回血": getInt('skillHealing'),
        "封技几率": getFloat('skillBlockSelfSkillChance')
    }
    const 本回合敌人效果 = {
        "减对方波段上限": getInt('skillNegativeUpperBand'),
        "减对方波段下限": getInt('skillNegativeLowerBand'),
        "减对方附加伤害": getInt('skillNegativeDMGBonus'),
        "减对方减伤": getInt('skillNegativeDMGReduction'),
        "减对方功力": getInt('skillNegativePowerBonus'),
        "减对方会心几率": getFloat('skillNegativeCritChance'),
        "减对方会心伤害": getFloat('skillNegativeCritMultiplier'),
        "减对方闪避率": getFloat('skillNegativeDodgeChance'),
        "减对方HP": getInt('skillNegativeHealing'),
        "封技几率": getFloat('skillBlockEnemySkillChance')
    }
    const 下回合自身效果 = {
        "波段上限": getInt('skillUpperBandNextRound'),
        "波段下限": getInt('skillLowerBandNextRound'),
        "附加伤害": getInt('skillDMGBonusNextRound'),
        "减伤": getInt('skillDMGReductionNextRound'),
        "功力": getInt('skillPowerBonusNextRound'),
        "会心几率": getFloat('skillCritChanceNextRound'),
        "会心伤害": getFloat('skillCritMultiplierNextRound'),
        "闪避率": getFloat('skillDodgeChanceNextRound'),
        "回血": getInt('skillHealingNextRound'),
        "封技几率": getFloat('skillBlockSelfSkillChanceNextRound')
    }
    const 下回合敌人效果 = {
        "减对方波段上限": getInt('skillNegativeUpperBandNextRound'),
        "减对方波段下限": getInt('skillNegativeLowerBandNextRound'),
        "减对方附加伤害": getInt('skillNegativeDMGBonusNextRound'),
        "减对方减伤": getInt('skillNegativeDMGReductionNextRound'),
        "减对方功力": getInt('skillNegativePowerBonusNextRound'),
        "减对方会心几率": getFloat('skillNegativeCritChanceNextRound'),
        "减对方会心伤害": getFloat('skillNegativeCritMultiplierNextRound'),
        "减对方闪避率": getFloat('skillNegativeDodgeChanceNextRound'),
        "减对方HP": getInt('skillNegativeHealingNextRound'),
        "封技几率": getFloat('skillBlockEnemySkillChanceNextRound')
    }
    const 敌人持续效果 = {
        "减对方波段上限": getInt('skillNegativeUpperBandPerma'),
        "减对方波段下限": getInt('skillNegativeLowerBandPerma'),
        "减对方附加伤害": getInt('skillNegativeDMGBonusPerma'),
        "减对方减伤": getInt('skillNegativeDMGReductionPerma'),
        "减对方功力": getInt('skillNegativePowerBonusPerma'),
        "减对方会心几率": getFloat('skillNegativeCritChancePerma'),
        "减对方会心伤害": getFloat('skillNegativeCritMultiplierPerma'),
        "减对方闪避率": getFloat('skillNegativeDodgeChance'),
        "减对方HP": getInt('skillNegativeHealingPerma'),
        "封技几率": getFloat('skillBlockEnemySkillChancePerma')
    }

    const 特殊攻击模式 = {
        "吸血": getBool('skillLifesteal'),
        "吸血比例": getBool('skillLifesteal') ? getFloat('skillLifestealPercent') : 0.0,
        "互伤": getBool('skillBothDamage'),
        "互冲": getBool('skillBothImpact'),
        "反弹": getBool('skillReflect'),
        "功力反弹比率": getBool('skillReflect') ? getFloat('skillReflectPercent') : 0.0
    }

    const 武学 = {
        "武学名": 武学名,
        "本回合自身效果": 本回合自身效果,
        "本回合敌人效果": 本回合敌人效果,
        "下回合自身效果": 下回合自身效果,
        "下回合敌人效果": 下回合敌人效果,
        "敌人持续效果": 敌人持续效果,
        "特殊攻击模式": 特殊攻击模式
    }
    fetchRequest("POST", '/createWuxue', 武学, (message) => {
        alert(message.message);
    });
    return;
});

document.getElementById('characterEquipWeapon').addEventListener("submit", function(e) {
    e.preventDefault();
    const characterName = getString('characterToEquipWeapon');
    const weaponName = getString('equipWeaponName');
    const removeWeapon = getBool('removeWeapon');
    const 装备 = {
        '角色名': characterName,
        '武器名': weaponName,
        '卸下': removeWeapon
    }
    fetchRequest("POST", '/equipWeapon', 装备, (message) => {
        alert(message.message);
    });
});

document.getElementById('characterLearnWuxue').addEventListener("submit", function(e) {
    e.preventDefault();
    const characterName = getString('characterToLearnSkill');
    const skillName = getString('learnSkillName');
    const forget = getBool('forgetWuxue');
    const 学习 = {
        '角色名': characterName,
        '武学名': skillName,
        '忘记': forget
    }
    fetchRequest("POST", '/learnWuxue', 学习, (message) => {
        alert(message.message);
    });
})

document.getElementById('searchCharacterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const characterName = getString('searchCharacterName');
    fetchRequest('POST', '/searchCharacter', { '角色名': characterName }, (data) => {
        if (!data.角色) {
            alert("角色不存在。");
        } else {
            const character = data.角色;
            setValue('editCharacterName', character.角色名);
            setValue('editCharacterUpperBand', character.波段上限);
            setValue('editCharacterLowerBand', character.波段下限);
            setValue('editCharacterPower', character.功力);
            setValue('editCharacterBandBonus', character.附加波段);
            setValue('editCharacterDMGBonus', character.附加伤害);
            setValue('editCharacterDMGReduction', character.减伤);
            setValue('editCharacterCritChance', character.会心几率);
            setValue('editCharacterCritMultiplier', character.会心伤害);
            setValue('editCharacterDodgeChance', character.闪避率);
            const weaponDiv = document.getElementById('editCharacterWeaponDiv');
            injectWeaponInput(character.武器, weaponDiv);
            const wuxueDiv = document.getElementById('editCharacterWuxueDiv');
            injectWuxueInput(character.武学, wuxueDiv);

        }
    })
});


document.getElementById('editCharacterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const originalCharacterName = getString('searchCharacterName');
    const characterName = getString('editCharacterName');
    if (characterName == "") {
        alert("角色名空缺");
        return;
    }
    const upperBand = getInt('editCharacterUpperBand');
    const lowerBand = getInt('editCharacterLowerBand');
    const power = getInt('editCharacterPower');
    const bandBonus = getInt('editCharacterBandBonus');
    const damageBonus = getInt('editCharacterDMGBonus');
    const damageReduction = getInt('editCharacterDMGReduction');
    const critChance = getFloat('editCharacterCritChance');
    const critMultiplier = getFloat('editCharacterCritMultiplier');
    const dodgeChance = getFloat('editCharacterDodgeChance');
    const weaponKeep = getBool('editCharacterWeapon');
    let wuxueKeep = [];
    const characterWuxue = document.getElementById('editCharacterWuxueDiv');
    const wuxues = characterWuxue.querySelectorAll('input');
    wuxues.forEach(wuxue => {
        wuxueKeep.push(wuxue.checked);
    });

    const newStat = {
        "originalCharacterName": originalCharacterName,
        "characterName": characterName,
        "upperBand": upperBand,
        "lowerBand": lowerBand,
        "power": power,
        "bonusBand": bandBonus,
        "bonusDamage": damageBonus,
        "damageReduction": damageReduction,
        "critChance": critChance,
        "critMultiplier": critMultiplier,
        "dodgeChance": dodgeChance,
        "weapon": weaponKeep,
        "wuxue": wuxueKeep
    };

    fetchRequest("POST", '/editCharacter', newStat, (message) => {
        alert(message.message);
    });
    return;
});


document.getElementById('searchWeaponForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const weaponName = getString('searchWeaponName');
    fetchRequest('POST', '/searchWeapon', { '武器名': weaponName }, (data) => {
        if (!data.武器) {
            alert("武器不存在。");
        } else {
            const weapon = data.武器;
            setValue('editWeaponName', weapon.武器名);
            const selfEffect = weapon.自身效果;
            setValue('editWeaponUpperBand', selfEffect.波段上限);
            setValue('editWeaponLowerBand', selfEffect.波段下限);
            setValue('editWeaponPowerBonus', selfEffect.功力);
            setValue('editWeaponDMGBonus', selfEffect.附加伤害);
            setValue('editWeaponDMGReduction', selfEffect.减伤);
            setValue('editWeaponCritChance', selfEffect.会心几率);
            setValue('editWeaponCritMultiplier', selfEffect.会心伤害);
            setValue('editWeaponDodgeChance', selfEffect.闪避率);
            setChecked('editWeaponLifeSteal', selfEffect.吸血);
            setValue('editWeaponLifeStealPercent', selfEffect.吸血比例);
            const enemyEffect = weapon.敌人效果;
            setValue('editWeaponNegativeUpperBand', enemyEffect.减对方波段上限);
            setValue('editWeaponNegativeLowerBand', enemyEffect.减对方波段下限);
            setValue('editWeaponNegativePowerBonus', enemyEffect.减对方功力);
            setValue('editWeaponNegativeDMGBonus', enemyEffect.减对方附加伤害);
            setValue('editWeaponNegativeDMGReduction', enemyEffect.减对方减伤);
            setValue('editWeaponNegativeCritChance', enemyEffect.减对方会心几率);
            setValue('editWeaponNegativeCritMultiplier', enemyEffect.减对方会心伤害);
            setValue('editWeaponNegativeDodgeChance', enemyEffect.减对方闪避率);
        }
    })
});

document.getElementById('editWeaponForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const originalWeaponName = getString('searchWeaponName');
    const weaponName = getString('editWeaponName');
    if (weaponName == "") {
        alert("武器名空缺");
        return;
    }
    const selfEffect = {
        '波段上限': getInt('editWeaponUpperBand'),
        '波段下限': getInt('editWeaponLowerBand'),
        '功力': getInt('editWeaponPowerBonus'),
        '附加伤害': getInt('editWeaponDMGBonus'),
        '减伤': getInt('editWeaponDMGReduction'),
        '会心几率': getFloat('editWeaponCritChance'),
        '会心伤害': getFloat('editWeaponCritMultiplier'),
        '闪避率': getFloat('editWeaponDodgeChance'),
        '吸血': getBool('editWeaponLifeSteal'),
        '吸血比例': getFloat('editWeaponLifeStealPercent')
    };
    const enemyEffect = {
        '减对方波段上限': getInt('editWeaponNegativeUpperBand'),
        '减对方波段下限': getInt('editWeaponNegativeLowerBand'),
        '减对方功力': getInt('editWeaponNegativePowerBonus'),
        '减对方附加伤害': getInt('editWeaponNegativeDMGBonus'),
        '减对方减伤': getInt('editWeaponNegativeDMGReduction'),
        '减对方会心几率': getFloat('editWeaponNegativeCritChance'),
        '减对方会心伤害': getFloat('editWeaponNegativeCritMultiplier'),
        '减对方闪避率': getFloat('editWeaponNegativeDodgeChance')
    };

    const newStat = {
        '原武器名': originalWeaponName,
        '武器名': weaponName,
        '自身效果': selfEffect,
        '敌人效果': enemyEffect
    }

    fetchRequest("POST", '/editWeapon', newStat, (message) => {
        alert(message.message);
    });
    return;
});

function setValue(id, value) {
    document.getElementById(id).value = value;
}

function setChecked(id, checked) {
    document.getElementById(id).checked = checked;
}

function getString(id) {
    return document.getElementById(id).value;
}

function getInt(id) {
    return parseInt(document.getElementById(id).value) || 0;
}

function getFloat(id) {
    return parseFloat(document.getElementById(id).value) || 0.0;
}

function getBool(id) {
    return document.getElementById(id).checked;
}

function injectWeaponInput(weaponName, div) {
    div.innerHTML = '';
    let weaponLabel = document.createElement('label');
    weaponLabel.setAttribute('for', 'editCharacterWeapon');
    weaponLabel.innerHTML = weaponName;
    let weaponInput = document.createElement('input');
    weaponInput.setAttribute('type', 'checkbox');
    weaponInput.setAttribute('name', 'editCharacterWeapon');
    weaponInput.setAttribute('id', 'editCharacterWeapon');
    weaponInput.checked = true;
    div.appendChild(weaponLabel);
    div.appendChild(weaponInput);
}

function injectWuxueInput(wuxue, div) {
    div.innerHTML = '';
    for (let index = 0; index < wuxue.length; index++) {
        const currWuxue = wuxue[index];
        let wuxueLabel = document.createElement('label');
        wuxueLabel.setAttribute('for', 'editCharacterWuxue' + (index + 1));
        wuxueLabel.innerHTML = currWuxue;
        let wuxueInput = document.createElement('input');
        wuxueInput.setAttribute('type', 'checkbox');
        wuxueInput.setAttribute('name', 'editCharacterWuxue' + (index + 1));
        wuxueInput.setAttribute('id', 'editCharacterWuxue' + (index + 1));
        wuxueInput.checked = true;
        div.appendChild(wuxueLabel);
        div.appendChild(wuxueInput);
    }
}


// Helper function to send a request to the server using the fetch() api
function fetchRequest(requestType, URL, data, callback) {
    if (requestType == "GET") {
        fetch(URL, {
                method: requestType,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) { // server sending non-200 codes
                    log("Error status:", response.status);
                    return;
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    log("Request Successful");
                    callback(data);
                } else {
                    log("Request Failed");
                }
            })
            .catch((error) => {
                console.error('Encountered error:', error);
            });

    } else {
        fetch(URL, {
                method: requestType,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) { // server sending non-200 codes
                    log("Error status:", response.status);
                    return;
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    log("Request Successful");
                    callback(data);
                } else {
                    log("Request Failed");
                }
            })
            .catch((error) => {
                console.error('Encountered error:', error);
            });
    }
}