const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  GuildID: String,
  Disabled: { type: [String], default: [] },
  Moderation: { type: Boolean, default: false },
  EXP: { type: Boolean, default: false },
  Log: Object,
  Welcome: Object,
});

module.exports = mongoose.model('guilds', guildSchema);
