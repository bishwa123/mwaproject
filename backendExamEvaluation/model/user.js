var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: Srting,
    username: Srting,
    password: Srting,
    active: Boolean,
    role: String,
    created_at: Date,
    updated_at: Date
  });
  
  module.exports = mongoose.model('users', userSchema);