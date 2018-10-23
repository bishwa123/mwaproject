var express = require("express");
var router = express.Router();
var model = require('./../../../model/model');
var apiResponse = require('../../../model/api_response');
var jwt = require('../../../libs/jwt');

router.get('/',(req,res)=>{
    model.user.find({},(err,users)=>{
        if(!err){
            apiResponse.status =200;
            apiResponse.data = users.filter(user => user.is_admin == 0);
            apiResponse.message = `Success`
          return res.json(apiResponse);    
        }
        else{
            apiResponse.status =500;
            apiResponse.message = `Failed`
            return res.json(apiResponse);
        }
    });
});

router.get('/:id',(req,res)=>{
    model.user.findById(req.params.id,(err,users)=>{
        if(!err){
            apiResponse.status =200;
            apiResponse.data = users;
            apiResponse.message = `Success`
          return res.json(apiResponse);    
        }
        else{
            apiResponse.status =500;
            apiResponse.message = `Failed`
            return res.json(apiResponse);
        }
    });
});

router.post("/", (req,res)=>{
    var User = new model.user({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        active: 1,
        is_admin:0
    });
    User.save((err, data)=>{
        if(!err)
        {
            apiResponse.status =200;
            apiResponse.data = data;
            apiResponse.message = `Success`
            return res.json(apiResponse);
        }
        else{
            apiResponse.status =500;
            apiResponse.message = `Failed`
            return res.json(apiResponse);
        }
    });
});

router.patch('/:id',(req,res)=>{
    let {name, password, active, is_admin} = req.body;
    model.user.update({_id: req.params.id}, {name, password, active, is_admin }, (err, data)=>{
            if(err) {
                apiResponse.status = "500";
                apiResponse.data = "";
                apiResponse.message = err.message;
                return res.json(apiResponse);
            } else {
                apiResponse.status = "200";
                apiResponse.data = data;
                apiResponse.message = "";
                return res.json(apiResponse);
            }
    });
});

router.post('/generatetoken',(req,res)=>{
    let {student_id, name, entry, date_of_birth} = req.body;
    console.log(req.body);
    let token = jwt.createStudentToken({student_id, name, entry, date_of_birth});
    let invitation = {'token':token,'status':'sent','valid':true}
    model.student.update({_id: student_id},{ $push:{
        'invitations': {$each: [invitation],$position:0}
      }},{upsert:true},(err,data)=>{
        if(!err){
            apiResponse.status = "200";
            apiResponse.data = token;
            apiResponse.message = "http://localhost:4200/student/"+token;
            res.json(apiResponse);
        }
        else{
            apiResponse.status = "500";
            apiResponse.data = '';
            apiResponse.message = err;
            res.json(apiResponse);
        }
    });
   
});

router.get('/student/notinvited',(req,res)=>{
    model.student.find({'invitations.0': {'$exists' : false}}, (err,students)=> {

        if(err){
            apiResponse.status = 500;
            apiResponse.data = "fsfs";
            apiResponse.message = err;
          return res.json(apiResponse);    
        }
        else{
            apiResponse.status = 200;
            apiResponse.data = students;
            apiResponse.message = ""
            return res.json(apiResponse);
        }
    });
});

router.get('/student/invited',(req,res)=>{
    model.student.find({'invitations.0': {'$exists' : true}}, (err,students)=> {
        if(err){
            apiResponse.status = 500;
            apiResponse.data = "";
            apiResponse.message = err;
          return res.json(apiResponse);    
        }
        else{
            apiResponse.status = 200;
            apiResponse.data = students;
            apiResponse.message = ""
            return res.json(apiResponse);
        }
    });
});

router.get('/student/notinvited',(req,res)=>{
    model.student.find({'invitations.0': {'$exists' : false}}, (err,students)=> {
        if(err){
            apiResponse.status = 500;
            apiResponse.data = "";
            apiResponse.message = err;
          return res.json(apiResponse);    
        }
        else{
            apiResponse.status = 200;
            apiResponse.data = students;
            apiResponse.message = ""
            return res.json(apiResponse);
        }
    });
});

router.get('/student/invited',(req,res)=>{
    model.student.find({'invitations.0': {'$exists' : true}}, (err,students)=> {
        if(err){
            apiResponse.status = 500;
            apiResponse.data = "";
            apiResponse.message = err;
          return res.json(apiResponse);    
        }
        else{
            apiResponse.status = 200;
            apiResponse.data = students;
            apiResponse.message = ""
            return res.json(apiResponse);
        }
    });
});

module.exports = router;