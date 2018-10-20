var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    category: String,
    active: Boolean,
    question: String,
    created_at: Date,
    updated_at: Date
  });

  questionSchema.pre('save', function(next){
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
  });

  module.exports = mongoose.model('questions', questionSchema);