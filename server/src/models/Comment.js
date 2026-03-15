"use strict";
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/dbConnection');

const Comment = sequelize.define('Comment', {
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
    // NOT: blogId ve userId alanlarını Sequelize otomatik ekleyecek.
});

module.exports = Comment;