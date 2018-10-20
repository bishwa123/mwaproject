var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    category: String,
    active: Boolean,
    question: String,
    created_at: Date,
    updated_at: Date
  });

  module.exports = mongoose.model('questions', questionSchema);