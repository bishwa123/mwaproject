var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
    name:String,
    student_id:String,
    entry:String,
    date_of_birth:Date,
    reports:[
        {
            question:String,
            answer:String,
            timespent:String,
            snapshots:[],
            timeoffbrowser:Number,
            accepted:Boolean
        }
    ],
    result:String

});
module.exports = mongoose.model('students',studentSchema);
