// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id: { type: String},
  name: { type: String },
  domain: { type: String},
  startDate: { type: Date },
  endDate: { type: Date },
  priority: { type: String }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
