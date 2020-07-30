const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({
  Warns: Array,
  User: String,
  Guild: String,
});

module.exports = mongoose.model('warns', warnSchema);
