"use strict";
const { DataTypes } = require('sequelize');
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
    countOfVisitors: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
    // NOT: userId ve categoryId alanlarını ilişki kurarken Sequelize otomatik ekleyecek.
});

module.exports = Blog;