"use strict";

const { Token, User } = require("../models/index");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey && tokenKey[0] === "Token") {
    try {
      const tokenData = await Token.findOne({ 
        where: { token: tokenKey[1] },
        include: [User] // Sequelize tarzı user bağlama
      });
      if (tokenData) req.user = tokenData.User;
    } catch (error) {
      console.error("Token Doğrulama Hatası:", error);
    }
  }
  next();
};