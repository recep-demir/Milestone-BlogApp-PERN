"use strict";

const { Token, User } = require("../models/index");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey && tokenKey[0] === "Token") {
    const tokenData = await Token.findOne({ 
      where: { token: tokenKey[1] },
      include: [User] // User bilgilerini de otomatik çekelim
    });
    if (tokenData) req.user = tokenData.User;
  }
  next();
};