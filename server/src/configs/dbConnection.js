"use strict";
const { Sequelize } = require('sequelize');

// DATABASE_URL varsa onu kullan, yoksa yerel ayarları kullan
const databaseUrl = process.env.DATABASE_URL;

let sequelize;

if (databaseUrl) {
    // Bulut veya dış veritabanı bağlantısı
    const isNeon = databaseUrl.includes('neon.tech');
    
    sequelize = new Sequelize(databaseUrl, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: isNeon ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {} // Eğer yerel bir URL ise SSL'i devre dışı bırakır
    });
} else {
    // Tamamen yerel (localhost/docker) bağlantısı
    sequelize = new Sequelize('blog_db', 'postgres', 'password123', {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
    });
}

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('* PostgreSQL Veritabanı Bağlantısı Başarılı *');
        
        require('../models/index');
        await sequelize.sync({ alter: true }); 
        console.log('* Tablolar Senkronize Edildi *');
    } catch (error) {
        console.error('* Veritabanı Bağlantı Hatası:', error);
    }
};

module.exports = { sequelize, dbConnection };