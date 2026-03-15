"use strict";
// 1. DataTypes'ı doğrudan sequelize kütüphanesinden alıyoruz:
const { DataTypes } = require('sequelize'); 
// 2. Kendi oluşturduğumuz bağlantıdan sadece sequelize'ı alıyoruz:
const { sequelize } = require('../configs/dbConnection');

const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    isPublish: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    likes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Like atan User ID'lerini tutacak Dizi
        defaultValue: []
    },
    countOfVisitors: {
        type: DataTypes.INTEGER, // Okunma sayısını tutacak Sayı
        defaultValue: 0,
    }
});

module.exports = Blog;