var express = require("express");
var router = express.Router();
var model = require("./../../../model/model");
var apiResponse=require("./../../../model/api_response")

router.get('/',(req,res)=>{
    model.student.find({}, (err, students)=>{
        if(err) {
            apiResponse.status = "500";
            apiResponse.data = "";
            apiResponse.message = err.message;
            return res.json(apiResponse);
        } else {
            apiResponse.status = "200";
            apiResponse.data = students;
            apiResponse.message = "";
            return res.json(apiResponse);        }
    });
});

router.get('/unpublished',(req,res)=>{
    model.student.find({"published":false}, (err, students)=>{
        if(err) {
            apiResponse.status = "500";
            apiResponse.data = "";
            apiResponse.message = err.message;
            return res.json(apiResponse);
        } else {
            apiResponse.status = "200";
            apiResponse.data = students;
            apiResponse.message = "";
            return res.json(apiResponse);        }
    });
});

router.get('/published',(req,res)=>{
    model.student.find({"published":true}, (err, students)=>{
        if(err) {
            apiResponse.status = "500";
            apiResponse.data = "";
            apiResponse.message = err.message;
            return res.json(apiResponse);
        } else {
            apiResponse.status = "200";
            apiResponse.data = students;
            apiResponse.message = "";
            return res.json(apiResponse);        }
    });
});

router.get('/:id',(req,res)=>{
    model.student.find({_id: req.params.id}, (err, student)=>{
        if(err) {
            apiResponse.status = "500";
            apiResponse.data = "";
            apiResponse.message = err.message;
            return res.json(apiResponse);
        } else {
            apiResponse.status = "200";
            apiResponse.data = student;
            apiResponse.message = "";
            return res.json(apiResponse);
        }
    });
});

router.post("/", (req,res)=>{

    let StudentModel = model.student;
    let {name, student_id, entry, date_of_birth} = req.body;

    let newStudent = new StudentModel({
        name,
        student_id, 
        entry, 
        date_of_birth
    });
    newStudent.save((err, data)=>{
        if(err){
            apiResponse.status = "500";
            apiResponse.data = "";
            apiResponse.message = err.message;
            return res.json(apiResponse);
        }else{
            apiResponse.status = "200";
            apiResponse.data = data;
            apiResponse.message = "student saved successfully!";
            return res.json(apiResponse);
        }
    });
});

router.patch('/:id',(req,res)=>{
    
    model.student.update({_id: req.params.id},
        {$push:{reports:{$each :[req.body],$position:0}}, "invitations.0.status":"answered" }, 
        (err, student)=>{
        if(err) {
            apiResponse.status = "500";
            apiResponse.data = "";
             apiResponse.message = err.message;
             return res.json(apiResponse);
         } else {
             apiResponse.status = "200";
             apiResponse.data = student;
             apiResponse.message = "";
             return res.json(apiResponse);
         }
     });
 });

router.patch('/edit/:id',(req,res)=>{
    model.student.update(
        {'_id': req.params.id, 'reports._id': req.body.report_id}, 
        {$set :
            {
                'reports.$.questions.0.accepted': req.body.question1,
                'reports.$.questions.1.accepted': req.body.question2,
                'reports.$.questions.2.accepted': req.body.question3,
                'published': req.body.publish,
                'result': req.body.result
            } 
        },(err, student)=>{
            if(err) {
                apiResponse.status = "500";
                apiResponse.data = "";
                apiResponse.message = err.message;
                return res.json(apiResponse);
            } else {
                apiResponse.status = "200";
                apiResponse.data = student;
                apiResponse.message = "";
                return res.json(apiResponse);
            }
    });
});

module.exports = router;

