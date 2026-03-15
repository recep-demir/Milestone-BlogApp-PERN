const { Sequelize } = require('sequelize');

// Docker-compose'da belirlediğimiz ayarlara göre bağlantı cümlesi (URI)
const sequelize = new Sequelize('blog_db', 'postgres', 'password123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Konsolda sürekli SQL sorgularını görmek istemezseniz false yapın
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