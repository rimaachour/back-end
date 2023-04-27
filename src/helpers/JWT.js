const { sign, verify }  = require('jsonwebtoken');

const {JWT_TOKEN} =  process.env;

async function GenerateToken(data){
    return sign(data, JWT_TOKEN, {expiresIn: '24hr'});
}

async function VerifyToken(token){
    return verify(token, JWT_TOKEN); // payload
}


module.exports = {
    GenerateToken, VerifyToken
}