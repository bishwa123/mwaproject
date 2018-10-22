var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
    name:String,
    student_id:String,
    entry:String,
    date_of_birth:Date,
    reports:[
        {
            date:Date,
            questions:[{
            question:String,
            answer:String,
            timespent:String,
            shapshots:[],
            timeoffbrowser:Number,
            accepted:Boolean
        }]
        }
    ],
    result:String

});
module.exports = mongoose.model('students',studentSchema);
