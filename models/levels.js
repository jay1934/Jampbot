const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
  userID: { type: String },
  guildID: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: new Date() },
  lastDaily: { type: Date },
  streak: { type: Number, default: 0 },
  achievements: {
    submittedClear: { type: Boolean, default: false },
    PogJamper: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('Levels', LevelSchema);
