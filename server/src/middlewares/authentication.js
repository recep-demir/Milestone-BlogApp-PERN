"use strict";

const { Token, User } = require("../models/index");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey && tokenKey[0] === "Token") {
    try {
      // 1. Önce sadece Token'ı bul (include KULLANMADAN)
      const tokenData = await Token.findOne({ 
        where: { token: tokenKey[1] }
      });

      if (tokenData) {
        // 2. Token bulunduysa userId'yi al (Sequelize bazen userId bazen UserId yapar)
        const userId = tokenData.userId || tokenData.UserId;
        
        if (userId) {
            // 3. Kullanıcıyı ID'sine göre manuel bul
            const user = await User.findByPk(userId);
            if (user) {
                req.user = user; // İŞTE ŞİMDİ YETKİLENDİRME BAŞARILI!
            }
        }
      }
    } catch (error) {
      console.error("Token Doğrulama Hatası:", error);
    }
  }
  next();
};