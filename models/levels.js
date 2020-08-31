const mongoose = require('mongoose');
const { boolean } = require('mathjs');

const LevelSchema = new mongoose.Schema({
  userID: { type: String },
  guildID: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: new Date() },
  lastDaily: { type: Date },
  streak: { type: Number, default: 0 },
  rep: { type: Number, default: 0 },
  lastAward: Date,
  boosted: {
    multi: { type: Number, default: 2 },
    bool: { type: Boolean, default: false },
  },
  pog: {
    multi: { type: Number, default: 1.5 },
    bool: { type: Boolean, default: false },
  },
  jamper: {
    multi: { type: Number, default: 1.2 },
    bool: { type: Boolean, default: false },
  },
  early: {
    multi: { type: Number, default: 1.5 },
    bool: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('Levels', LevelSchema);
