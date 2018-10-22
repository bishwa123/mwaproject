var createError = require('http-errors');
var validator = require('express-validator');
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
<<<<<<< HEAD
=======
var jwt = require('jsonwebtoken')
var apiResponse = require('./model/api_response')

>>>>>>> origin/master

var apiV1QuestionsRoute = require('./routes/api/v1/question')
var apiV1AdminRoute = require('./routes/api/v1/admin')
var apiV1StudentRoute = require('./routes/api/v1/student')
var apiV1StaffRoute = require('./routes/api/v1/staff')
var apiV1LoginRoute = require('./routes/api/v1/connect');

var app = express();

mongoose.connect("mongodb://admin:admin123@ds137263.mlab.com:37263/mwa", { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());
app.use(cors()); 

app.use('/api/v1/login', apiV1LoginRoute);
app.use('/api/v1/student', apiV1StudentRoute);
app.use('/api/v1/questions', verifyToken, apiV1QuestionsRoute);
app.use('/api/v1/admin',verifyToken, apiV1AdminRoute);
app.use('/api/v1/staff',verifyToken, apiV1StaffRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Fotrmat of token
//Authorization : Bearer <access_token>
function verifyToken(req, res, next) {
  const bearerheader = req.headers['authorization'];
  if (typeof bearerheader != 'undefined') {
    const bearer = bearerheader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, 'secretkey', function (err, authData) {
      if (err){
        apiResponse.status =403;
        apiResponse.data ='';
        apiResponse.message ="Access Forbidden";
        return res.json(apiResponse)
      }
      else {
        return next();
      }
    });
  }
  else {
    apiResponse.status =403;
    apiResponse.message ="Access Forbidden";
    apiResponse.data="";
    return res.json(apiResponse)
  }
  return next();
}
app.listen(3001, () => console.log("listening to port 3000"))
module.exports = app;
