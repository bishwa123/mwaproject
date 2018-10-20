var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: String,
    username: {type: String, unique:true},
    password: {type:String, required:true},
    active: Boolean,
    is_admin:Boolean,
    created_at: Date,
    updated_at: Date
  });

  userSchema.pre('save', function(next){
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
  });
  
  module.exports = mongoose.model('users', userSchema);