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
    let {name, student_id, entry, date_of_birth} = req.body;
    model.student.update({_id: req.params.id}, {$push:{reports:req.body} }, (err, student)=>{
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

