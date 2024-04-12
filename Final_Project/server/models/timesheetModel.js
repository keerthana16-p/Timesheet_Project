const mongoose = require('mongoose');


const timesheetSchema = new mongoose.Schema({
    UID:{
      type: String,
      unique: true,
      required:true
    },
    email: {
      type: String,
      required: true
    },
    rowid:{
      type:Number,
    },
    id: {
      type: String
    },
    projectType: {
      type: String
    },
    projectName: {
      type: String
    },
    task:{
      type: String
    },
    comment:{
      type: String
    },
    mon: {
      type: Number,
    },
    tue: {
      type: Number,
    },
    wed: {
      type: Number,
    },
    thur: {
      type: Number,
    },
    fri: {
      type: Number,
    },
    sat: {
      type: Number,
    },
    sun: {
      type: Number,
    },
    total: {
      type:Number,
    },
    startDate: {
      type:String,
    },
    endDate: {
      type:String,
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    visible:{
      type:Boolean,
      default:true
    }
  });
  module.exports = mongoose.model('timesheets', timesheetSchema);