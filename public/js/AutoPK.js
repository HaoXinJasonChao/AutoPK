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
    const characterName = document.getElementById('newCharacterName').value;
    if (characterName == "") {
        alert("角色名空缺");
        return;
    }
    const upperBand = parseInt(document.getElementById('newCharacterUpperBand').value) || 0;
    const lowerBand = parseInt(document.getElementById('newCharacterLowerBand').value) || 0;
    const power = parseInt(document.getElementById('newCharacterPower').value) || 0;
    const bandBonus = parseInt(document.getElementById('newCharacterBandBonus').value) || 0;
    const damageBonus = parseInt(document.getElementById('newCharacterDMGBonus').value) || 0;
    const damageReduction = parseInt(document.getElementById('newCharacterDMGReduction').value) || 0;
    const critChance = parseFloat(document.getElementById('newCharacterCritChance').value) || 0.0;
    const critMultiplier = parseFloat(document.getElementById('newCharacterCritMultiplier').value) || 0.0;
    const dodgeChance = parseFloat(document.getElementById('newCharacterDodgeChance').value) || 0.0;

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
    const weaponName = document.getElementById('weaponName').value;
    if (weaponName == "") {
        alert("武器名空缺！");
        return;
    }
    const upperBand = parseInt(document.getElementById('weaponUpperBand').value) || 0;
    const lowerBand = parseInt(document.getElementById('weaponLowerBand').value) || 0;
    const power = parseInt(document.getElementById('weaponPowerBonus').value) || 0;
    const damageBonus = parseInt(document.getElementById('weaponDMGBonus').value) || 0;
    const damageReduction = parseInt(document.getElementById('weaponDMGReduction').value) || 0;
    const critChance = parseFloat(document.getElementById('weaponCritChance').value) || 0.0;
    const critMultiplier = parseFloat(document.getElementById('weaponCritMultiplier').value) || 0.0;
    const dodgeChance = parseFloat(document.getElementById('weaponDodgeChance').value) || 0.0;

    const upperBandNegative = parseInt(document.getElementById('weaponNegativeUpperBand').value) || 0;
    const lowerBandNegative = parseInt(document.getElementById('weaponNegativeLowerBand').value) || 0;
    const powerNegative = parseInt(document.getElementById('weaponNegativePowerBonus').value) || 0;
    const damageBonusNegative = parseInt(document.getElementById('weaponNegativeDMGBonus').value) || 0;
    const damageReductionNegative = parseInt(document.getElementById('weaponNegativeDMGReduction').value) || 0;
    const critChanceNegative = parseFloat(document.getElementById('weaponNegativeCritChance').value) || 0.0;
    const critMultiplierNegative = parseFloat(document.getElementById('weaponNegativeCritMultiplier').value) || 0.0;
    const dodgeChanceNegative = parseFloat(document.getElementById('weaponNegativeDodgeChance').value) || 0.0;

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
            "dodgeChance": dodgeChance
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