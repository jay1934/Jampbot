const mongoose = require('mongoose');

const botterSchema = new mongoose.Schema({
  UserID: String,
  BotID: String,
  Prefix: String,
  Accepted: { type: Boolean, default: false },
  HasChannel: { type: Boolean, default: false },
  Blacklisted: { type: Boolean, default: false },
  Invited: { type: Date, default: Date() },
});

module.exports = mongoose.model('botter', botterSchema);
