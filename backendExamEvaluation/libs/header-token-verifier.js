let apiResponse = require('./../model/api_response');
let jwt = require('./jwt');

let headerTokenVerifier = (req, res, next) => {
    if (!req.headers.authorization) {
        apiResponse.status =403;
        apiResponse.message ="Access Forbidden!";
        apiResponse.data="";
        return res.json(apiResponse);
    }

    let token = req.headers.authorization.split(' ')[1];
    
    jwt.verifyToken(token).then(() => {
        return next();
    }).catch((error)=>{
        apiResponse.status = 403;
        apiResponse.data = '';
        apiResponse.message = "Access Forbidden";
        return res.json(apiResponse)
    });
};

module.exports = headerTokenVerifier;