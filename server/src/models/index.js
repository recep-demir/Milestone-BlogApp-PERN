"use strict";
const User = require('./User');
const Blog = require('./Blog');
const Category = require('./Category');
const Comment = require('./Comment');
const Token = require('./Token');

// User - Token (Bire-Bir)
User.hasOne(Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
Token.belongsTo(User, { foreignKey: 'userId' });

// User - Blog (Bire-Çok)
User.hasMany(Blog, { foreignKey: 'userId', onDelete: 'CASCADE' });
Blog.belongsTo(User, { foreignKey: 'userId' });

// Category - Blog (Bire-Çok)
Category.hasMany(Blog, { foreignKey: 'categoryId' });
Blog.belongsTo(Category, { foreignKey: 'categoryId' });

// Blog - Comment (Bire-Çok)
Blog.hasMany(Comment, { foreignKey: 'blogId', onDelete: 'CASCADE' });
Comment.belongsTo(Blog, { foreignKey: 'blogId' });

// User - Comment (Bire-Çok)
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Blog,
    Category,
    Comment,
    Token
};