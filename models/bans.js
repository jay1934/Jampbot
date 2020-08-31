const mongoose = require('mongoose');

const banSchema = new mongoose.Schema({
  UserID: String,
  Username: String,
  Mod: String,
  Reason: String,
  Disabled: { type: [String], default: [] },
  Moderation: { type: Boolean, default: false },
  EXP: { type: Boolean, default: false },
  Log: Object,
  Welcome: Object,
});

module.exports = mongoose.model('bans', banSchema);
