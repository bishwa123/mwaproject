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
                snapshots:[],
                timeoffbrowser:Number,
                accepted:Boolean
            }]
        }
    ],
    result: Boolean,
    published: Boolean
});
module.exports = mongoose.model('students',studentSchema);
