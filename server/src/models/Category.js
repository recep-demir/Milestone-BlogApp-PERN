"use strict";
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/dbConnection');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Category;