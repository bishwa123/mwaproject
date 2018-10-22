var key = require('../config/keys');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwt = { verifyToken: verifyToken, createToken: createToken }

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, key.tokenKey, function(err, user) {
            if (err)  {
                reject(err)
            } else {
                resolve(user);
            }
        });
    });
}

function createToken(user) {
    let user_data = {
        username: user.username, 
        name: user.name,
        password: user.password,
        is_admin: user.is_admin,
        active: user.active
    }
    var token = jsonwebtoken.sign(user_data, key.tokenKey, {
        expiresIn: 86400 // expires in 24 hours
      });
  return token;
}

module.exports = jwt;