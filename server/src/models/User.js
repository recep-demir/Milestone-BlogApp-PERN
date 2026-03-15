"use strict";
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/dbConnection');
const passwordEncrypt = require('../helpers/passwordEncrypt');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    hooks: {
        beforeCreate: (user) => {
            if (user.password) user.password = passwordEncrypt(user.password);
        },
        beforeUpdate: (user) => {
            if (user.changed('password')) user.password = passwordEncrypt(user.password);
        }
    }
});

module.exports = User;