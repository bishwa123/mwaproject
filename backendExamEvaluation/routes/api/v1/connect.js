var express = require("express");
var router = express.Router();
var model = require("./../../../model/model");
var apiResponse = require('./../../../model/api_response');
const jwt = require('../../../libs/jwt');

router.post('/login', (req, res) => {

    let { username, password } = req.body;

    req.assert(username, 'username is required').notEmpty();
    req.assert(password, 'passwprd is required').notEmpty();

    // validation code goes here
    // encrypt password
    // let hashedPassword = bcrypt.hashSync(password, 8);

    model.user.findOne({ username, password }, function (error, user) {
        if (error){
            apiResponse.status = "500";
            apiResponse.data = "";
            apiResponse.message = "An error occured, please try later!";
            return res.json(apiResponse);
        }else{
            if(user!=null) {
                let token = jwt.createToken(user);
                apiResponse.status = "200";
                apiResponse.data = token;
                apiResponse.message = user.is_admin;
                return res.json(apiResponse);
            }else{
                apiResponse.status = "200";
                apiResponse.data = null;
                apiResponse.message = "username or password incorrect!";
                return res.json(apiResponse);
            }
            
        }
        /*
        user.comparePassword({ password: password }, function (err, isMatch) {
            if (err)
                return res.send('the password is incorrect');
        });
        */
    });
});

router.post('/admincheck', (req, res) => {
    let token = req.body.token;
    jwt.verifyToken(token)
        .then((user)=>{
            if(user.is_admin) {
                apiResponse.status = "200";
                apiResponse.data = true;
                apiResponse.message = "";
                return res.json(apiResponse);
            }else{
                apiResponse.status = "200";
                apiResponse.data = false;
                apiResponse.message = "";
                return res.json(apiResponse);
            }
        })
        .catch((error)=>{
                apiResponse.status = "500";
                apiResponse.data = "";
                apiResponse.message = "An error has been occured";
                return res.json(apiResponse);
        });
});

module.exports = router;
