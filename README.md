# AutoPK

This is a DND-esq automatic battle calculator.

A character in this battle system have the following inherent statistics:

    band: consist of an upper and a lower bound, in a standard battle, both opponents roll a random number between their upper and lower band, the one who rolls the higher number on that round deals damage.

    power: determines the damage and health of the character. During each round, the base damage dealt by the player who rolls a higher number is equal to the difference in the numbers rolled multiply by their power. Depending on the version of the system, the character's health may be 10xpower or 100xpower.

    max hp: maximum health.

    curr hp: current health.

    band bonus: flat bonus to the player's band value.

    dmg bonus: flat bonus to the player's damage output.

    dmg reduction: flat reduction to the damage taken by the player, i.e. defence.

    crit change: probability of a critical stike.

    crit ratio: multiplier of critical damage.

    dodge chance: chance of dodging an attack.

Each charater can have the following attribute:

    weapon: the weapon currently equipped, weapons provide extra stat bonus.

    skills: a character can have multiple skills, an each round they can choose to use a skill to use.

    xinfa: a character can equip one xinfa at a time, xinfa provide unique bonuses and it is independent of skills.

Process of a battle:
1. each player picks the order of skill for 5 rounds, then battle starts.
2. each round, all bonuses are calculated for both players, then they both roll a band value.
3. The player with the higher band value deals damage to the other player.
4. when one player's health reduces to 0, the other player wins.
