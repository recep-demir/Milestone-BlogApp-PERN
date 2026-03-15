"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Model dosyalarını doğru yollarla içe aktar
const { mongoose } = require('./src/configs/dbConnection');
const User = require('./src/models/user');
const Category = require('./src/models/category');
const Blog = require('./src/models/blog');

/* ------------------------------------------------------- */

module.exports = async () => {
    try {
        await User.deleteMany().then(() => console.log(' - User Deleted All'));
        await Category.deleteMany().then(() => console.log(' - Category Deleted All'));
        await Blog.deleteMany().then(() => console.log(' - Blog Deleted All'));


        const user = await User.create({
            username: "testuser",
            password: "Test@1234", 
            email: "test@test.com",
            firstName: "Test",
            lastName: "Test",
            isActive: true,
            isStaff: false,
            isAdmin: false,
        });
        console.log(' - Test User Created:', user.email);

        const category = await Category.create({
            name: 'Test Category',
        });
        console.log(' - Test Category Created:', category.name);

        
        const blogPosts = [];
        for (let i = 0; i < 10; i++) { 
            const blogPost = await Blog.create({
                userId: user._id,
                categoryId: category._id,
                title: `Test Post ${i + 1}`,
                content: `This is the content of test post ${i + 1}.`,
                image: `https://example.com/test-image-${i + 1}.jpg`, 
                isPublish: i % 2 === 0, 
                likes: [], 
                countOfVisitors: 0, 
            });
            blogPosts.push(blogPost);
        }
        console.log(` - ${blogPosts.length} Test Blog Posts Created`);

        
        console.log('* Synchronized.');
    } catch (error) {
        console.error('Error during synchronization:', error);
        throw error; 
    }
};

