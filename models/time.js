const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  Key: String,
  UserID: String,
  Date,
});

module.exports = mongoose.model('time', timeSchema);
