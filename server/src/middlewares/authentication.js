" use strict"

const Token = require('../models/token');

module.exports= async (req, res, next) => {
    req.user = null;

    const auth = req.headers?.authorization
    const tokenArr = auth ? auth.split(' ') : null;

    if(tokenArr && tokenArr[0]=='Token') {
        const tokenData = await Token.findOne({token: tokenArr[1]}).populate('userId')
        req.user = tokenData ? tokenData.userId : null;
    }

    next();


}