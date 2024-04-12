const mongoose = require('mongoose');

const resourceAllocationSchema = new mongoose.Schema({
  projectName: String,
  userName: String,
  email:String,
  startDate: String,
  endDate: String,
});

const Resource_Allocation = mongoose.model('ResourceAllocation', resourceAllocationSchema);

module.exports = Resource_Allocation;
