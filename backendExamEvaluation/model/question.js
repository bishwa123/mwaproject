var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    category: Srting,
    active: Boolean,
    question: Srting,
    created_at: Date,
    updated_at: Date
  });

  module.exports = mongoose.model('questions', questionSchema);