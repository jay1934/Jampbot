const pogjamper = require('../../config.json');
const { getRandomInt } = require('../../utils/functions');

let i;

module.exports = {
  name: 'level-idea',
  blacklist: true,
  category: 'fun',
  usage: '!level-idea',
  description: 'Gets a random level idea',
  async execute(message, args) {
    function randomLevelIdea() {
      const data = {
        styles: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
        night: [
          'Ground',
          'Underground',
          // "Underwater",
          'Ghost House',
          'Airship',
          'Castle',
          'Desert',
          'Snow',
          'Forest',
          'Sky',
        ],
        clearCondition: [
          "the don't touch the ground",
          "the don't take damage",
          'a',
        ],
        gizmos: {
          burners: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          cannons: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          vines: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          lifts: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'flimsy lifts': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'lava lifts': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'fast lava lifts': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          seesaws: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          grinders: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          bumpers: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'swinging claws': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          skewers: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'fire bars': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'one-way walls': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          tracks: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'conveyor belts': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'ON/OFF switches': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'dotted-line blocks': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'snake blocks': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'P blocks': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'P switches': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'POW blocks': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          springs: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          icicles: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          twisters: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          // Key: ["SMB1", "SMB3", "SMW", "NSMBU", "3DW"],
          'bill blasters': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'banzai bills': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'a cursed key': ['SMB1'],
          crates: ['3DW'],
          '! blocks': ['3DW'],
          'blinking blocks': ['3DW'],
          'track blocks': ['3DW'],
          trees: ['3DW'],
          'ON/OFF trampolines': ['3DW'],
          'mushroom trampolines': ['3DW'],
          'dash blocks': ['3DW'],
          'spike blocks': ['3DW'],
          'cloud lifts': ['3DW'],
          'red POW blocks': ['3DW'],

          'note blocks': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'donut blocks': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'hidden blocks': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          '? blocks': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          spikes: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'clear pipes': ['3DW'],
        },
        powerups: {
          'the Super Mushroom': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'the Master Sword': ['SMB1'],
          'the Fire Flower': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'the Superball Flower': ['SMB1'],
          'the Big Mushroom': ['SMB1'],
          'the Super Leaf': ['SMB3'],
          'the Cape Feather': ['SMW'],
          'the Propeller Mushroom': ['NSMBU'],
          'the Super Bell': ['3DW'],
          'the Super Hammer': ['3DW'],
          'the SMB Mushroom': ['SMB1'],
          'the Frog Suit': ['SMB3'],
          'the Power Balloon': ['SMW'],
          'the Super Acorn': ['NSMBU'],
          'the Boomerang Flower': ['3DW'],
          'the Super Star': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'the Rotten Mushroom': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'the Shoe Goomba': ['SMB1', 'SMB3'],
          "Yoshi's Egg": ['SMW', 'NSMBU'],
          'the Cannon Box': ['3DW'],
          'the Propeller Box': ['3DW'],
          'the Goomba Mask': ['3DW'],
          'the Bullet Bill Mask': ['3DW'],
          'the Red POW Box': ['3DW'],
        },
        enemies: {
          'Koopa Troopas': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'Buzzy Beetles': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Buzzy Shells': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Spike Tops': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Ant Troopers': ['3DW'],
          Spinies: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'Spiny Shells': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          Bloopers: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Cheep Cheeps': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          Skipsqueaks: ['3DW'],
          Stingbies: ['3DW'],
          'Piranha Plants': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          Munchers: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Piranha Creepers': ['3DW'],
          Thwomps: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'Monty Moles': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Rocky Wrenches': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Chain Chomps': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Unchained Chomps': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Hop-Chops': ['3DW'],
          Snowballs: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          Wigglers: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          Boos: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'Lava Bubbles': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'Bob-ombs': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'Dry Bones': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'Dry Bone Shells': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Fish Bones': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          Magikoopas: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          Pokeys: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          Bowser: ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          'Bowser Jr.': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Boom Boom/Pom Pom': ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'],
          Mechakoopas: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Angry Sun': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          "Lakitu/Lakitu's cloud": ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          Charvaarghs: ['3DW'],
          Bullies: ['3DW'],
          Porcupuffers: ['3DW'],
          'Clown Cars': ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          'Koopa Troopa Cars': ['3DW'],
          Larry: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          Iggy: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          Wendy: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          Lemmy: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          Roy: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          Morton: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
          Ludwig: ['SMB1', 'SMB3', 'SMW', 'NSMBU'],
        },
      };

      const chosen = {
        style: '',
        night: '',
        clearCondition: '',
        others: [],
      };

      function randomElement(arr) {
        return arr[getRandomInt(0, arr.length - 2)];
      }

      function filterElement(styles) {
        const varNames = ['powerups', 'enemies', 'gizmos'];
        for (let k = 0; k < varNames.length; k++) {
          for (const i in data[varNames[k]]) {
            let shared = false;
            for (let j = 0; j < styles.length; j++) {
              if (data[varNames[k]][i].indexOf(styles[j]) !== -1) shared = true;
            }
            if (!shared) delete data[varNames[k]][i];
          }
        }
      }

      if (Math.random() > 0.7) {
        chosen.style = randomElement(data.styles);
        filterElement([chosen.style]);
      }
      if (Math.random() > 0.9) {
        chosen.night = randomElement(data.night);
        if (chosen.night === 'Ground')
          delete data.powerups['the Rotten Mushroom'];
      }
      if (Math.random() > 0.9) {
        chosen.clearCondition = randomElement(data.clearCondition);
      }

      const num =
        !(chosen.style || chosen.night || chosen.clearCondition) ||
        Math.random() < 0.9
          ? getRandomInt(1, 3)
          : 0;
      const others = [];
      for (i = 0; i < num; i++) {
        others.push(
          Math.random() > 0.8
            ? 'powerups'
            : Math.random() > 0.5
            ? 'gizmos'
            : 'enemies'
        );
      }
      for (i = 0; i < others.length; i++) {
        const vals = Object.keys(data[others[i]]);
        const o = randomElement(vals);
        filterElement(data[others[i]][o]);
        delete data[others[i]][o];
        chosen.others.push(o);
      }
      let chosenString = [];
      if (chosen.style) {
        chosenString.push(chosen.style);
      }
      if (chosen.night) {
        chosenString.push(`Night ${chosen.night}`);
      }
      if (chosenString.length) {
        chosenString = `${chosenString.join(' ')} `;
      } else {
        chosenString = '';
      }
      let chosenString2 = [];
      if (chosen.clearCondition) {
        chosenString2.push(`${chosen.clearCondition} clear condition`);
      }
      if (chosen.others) {
        chosenString2 = chosenString2.concat(chosen.others);
      }
      if (chosenString2.length) {
        chosenString2 = ` with ${chosenString2.join(', ')}`;
      } else {
        chosenString2 = '';
      }
      return `${chosenString}Jamp level${chosenString2}`.replace(
        /,(?=[^,]*$)/,
        ' and'
      );
    }
    message.reply(
      `I think you should create a ${randomLevelIdea()} <a:PogJamper:704670075667611648>`
    );
  },
};
