"use strict";
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog_db', 'postgres', 'password123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('* PostgreSQL Veritabanı Bağlantısı Başarılı *');
    
    // İlişkileri yükle
    require('../models/index');

    // Tabloları veritabanıyla senkronize et
    await sequelize.sync({ alter: true }); 
    console.log('* Tablolar Senkronize Edildi *');
  } catch (error) {
    console.error('* Veritabanı Bağlantı Hatası:', error);
  }
};

module.exports = { sequelize, dbConnection };