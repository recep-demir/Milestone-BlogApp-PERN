"use strict";

const { Token, User } = require("../models/index");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey && tokenKey[0] === "Token") {
    try {
      // 1. Sadece token'ı veritabanında arıyoruz
      const tokenData = await Token.findOne({ 
        where: { token: tokenKey[1] }
      });
      
      // 2. Eğer token bulunduysa, içindeki userId ile kullanıcıyı buluyoruz
      if (tokenData && tokenData.userId) {
        const userData = await User.findByPk(tokenData.userId);
        if (userData) {
           req.user = userData; // req.user doldu! 403 hatası artık yok.
        }
      }
    } catch (error) {
      console.error("Token Doğrulama Hatası:", error);
    }
  }
  next();
};