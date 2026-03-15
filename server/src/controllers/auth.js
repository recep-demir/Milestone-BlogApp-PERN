"use strict";

const { User, Token } = require("../models/index");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Login"
    */
    const { username, password } = req.body;

    if (username && password) {
      const user = await User.findOne({ 
        where: { 
          username, 
          password: passwordEncrypt(password) 
        } 
      });

      if (user) {
        // Token oluştur veya var olanı getir
        let tokenData = await Token.findOne({ where: { userId: user.id } });
        
        if (!tokenData) {
          tokenData = await Token.create({
            userId: user.id,
            token: passwordEncrypt(user.username + Date.now()),
          });
        }

        res.status(200).send({
          error: false,
          token: tokenData.token,
          user: user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong Username or Password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username and password.");
    }
  },

  logout: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Logout"
    */
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;

    if (tokenKey && tokenKey[0] === "Token") {
      await Token.destroy({ where: { token: tokenKey[1] } });
    }

    res.status(200).send({
      error: false,
      message: "Logout: Token Deleted.",
    });
  },
};