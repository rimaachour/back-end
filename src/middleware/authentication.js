const { VerifyToken } = require("../helpers/JWT");

module.exports = async function authentication(req, res, next){
    try {
        const token = req.header('Authorization');
     console.log(token)
        if(!token) throw new Error('invalid token, token is required');
        const signture = token?.replace(/bearer\s/gi, '').trim();
        console.log(signture);

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