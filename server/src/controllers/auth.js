"use strict"

const CustomError = require("../helpers/customError");
const User = require('../models/user');
const Token = require('../models/token');
const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {
    login: async (req,res) => {

        /* 
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with email/username and password'
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    username:'admin',
                    password:'1234'
                }
            }
        */

        const { username, email, password } = req.body;
         if (!((username || email) && password)) throw new CustomError('username/email and password are required', 401);
         const user = await User.findOne({ $or: [{ email }, { username }], password });
         if (!user) throw new CustomError('Incorrect email/username or password', 401);
         if (!user.isActive) throw new CustomError('This account is not active.');

         let tokenData = await Token.findOne({ userId: user._id });

         if(!tokenData) {
            tokenData= await Token.create({
                userId : user._id,
                token : passwordEncrypt(Date.now() + user._id)
            })
         }

         res.status(200).send({
            error:false,
            token:tokenData.token,
            user:user
         })

    },
    logout:async (req,res) => {
        /* 
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'Deleted Token'
        */

        const auth = req.headers?.authorization; 
        const tokenArr = auth ? auth.split(' ') : null;

        if (tokenArr && tokenArr[0] == 'Token') {
            const result = await Token.deleteOne({ token: tokenArr[1] });

            res.status(200).send({
                error: false,
                result,
                message: 'Simple Token: Token Deleted. Logout Success.'
            });

        }
}
}