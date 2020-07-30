const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  Closed: Boolean,
  ReportID: String,
  CreatorID: String,
  Report: String,
});

module.exports = mongoose.model('reports', reportSchema);
