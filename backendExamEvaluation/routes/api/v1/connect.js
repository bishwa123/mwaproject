var express = require("express");
var router = express.Router();
var model = require("./../../../model/model");

router.post('/', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    req.assert(username, 'username is required').notEmpty();
    req.assert(password, 'passwprd is required').notEmpty();

    //model.user.findOne({ username: username }, function (err, usern) {
        // if (err)
        //     return res.send('the user is not found');
        // usern.comparePassword({ password: password }, function (err, isMatch) {
        //     if (err)
        //         return res.send('the password is incorrect');
        // });
    //})
    res.send({"test":true})
});
module.exports = router;
