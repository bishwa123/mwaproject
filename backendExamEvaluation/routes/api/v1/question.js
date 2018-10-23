var express = require("express");
var router = express.Router();
var model = require('./../../../model/model');
var apiResponse = require('./../../../model/api_response');
var jwt = require('./../../../libs/jwt');

router.get('/',(req,res)=>{
    model.question.find({}, (err, questions)=>{
        if(err) {
            apiResponse.status = "500";
            apiResponse.data = "";
            apiResponse.message = err.message;
            return res.json(apiResponse);
        } else {
            apiResponse.status = "200";
            apiResponse.data = questions;
            apiResponse.message = "";
            return res.json(apiResponse);
        }
    });
});

router.get('/:id',(req,res)=>{
    model.question.find({_id: req.params.id}, (err, question)=>{
        if(err) {
            apiResponse.status = "500";
            apiResponse.data = "";
            apiResponse.message = err.message;
            return res.json(apiResponse);
        } else {
            apiResponse.status = "200";
            apiResponse.data = question;
            apiResponse.message = "";
            return res.json(apiResponse);
        }
    });
});

router.post("/", (req,res)=>{

    let QuestionModel = model.question;
    let {category, question} = req.body;

    let newQuestion = new QuestionModel({
        category,
        active: true,
        question
    });

    newQuestion.save((err, data)=>{
        if(err){
            apiResponse.status = "500";
            apiResponse.data = "";
            apiResponse.message = err.message;
            return res.json(apiResponse);
        }else{
            apiResponse.status = "200";
            apiResponse.data = data;
            apiResponse.message = "question saved successfully!";
            return res.json(apiResponse);
        }
    });
});

router.patch('/:id',(req,res)=>{
    
    let {category, question, active} = req.body;
    model.question.update({_id: req.params.id}, {category, active, question }, (err, question)=>{
        if(err) {
            apiResponse.status = "500";
            apiResponse.data = "";
            apiResponse.message = err.message;
            return res.json(apiResponse);
        } else {
            apiResponse.status = "200";
            apiResponse.data = question;
            apiResponse.message = "";
            return res.json(apiResponse);
        }
    });
});

router.get('/validatetokenandgetquestions/:token',(req,res)=>{
    jwt.verifyToken(req.params.token).then((student) =>{
        model.question.findRandom({"active":true}, {}, {limit: 3}, function(err, questions){
            if(err) {
                apiResponse.status = "500";
                apiResponse.data = "eee";
                apiResponse.message = err.message;
                return res.json(apiResponse);
            } else {
                apiResponse.status = "200";
                apiResponse.data = questions;
                apiResponse.message = student.student_id;
                return res.json(apiResponse);
            }
        });
    }).catch((error)=>{
        apiResponse.status = "500";
        apiResponse.data = "";
        apiResponse.message = error.message;
        return res.json(apiResponse);
    });
});

module.exports = router;