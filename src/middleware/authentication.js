const { VerifyToken } = require("../helpers/JWT");

module.exports = async function authentication(req, res, next){
    try {
        const token = req.header('Authorization');
        if(!token) throw new Error('invalid token, token is required');


        const [sign, signture] = token?.split(/\s/gi);
        console.log(sign)
        console.log(signture)
        const payload = await VerifyToken(signture);
        console.log(payload)
        req.local = {
            ...payload
        }
        next();
    } catch (error) {
        next(error);
    }
}