"use strict";

const { sequelize, User, Category, Blog } = require('./src/models/index');

module.exports = async () => {
    try {
        await sequelize.sync();
        await Blog.destroy({ where: {}, cascade: true });
        await Category.destroy({ where: {}, cascade: true });
        await User.destroy({ where: {}, cascade: true });

        console.log(' - Old data cleared successfully.');

        const user = await User.create({
            username: "johndoe",
            password: "Password123", 
            email: "john.doe@techblog.com",
            firstName: "John",
            lastName: "Doe",
            bio: "Senior Software Engineer & Tech Enthusiast",
            isAdmin: true
        });

        const cats = await Category.bulkCreate([
            { name: 'Artificial Intelligence' },
            { name: 'Web Development' },
            { name: 'Data Science' },
            { name: 'Cybersecurity' },
            { name: 'Cloud Computing' }
        ],{ returning: true });

        await Blog.bulkCreate([
            {
                title: 'The Future of Generative AI in Software Engineering',
                content: 'Generative AI models like ChatGPT and GitHub Copilot are reshaping how developers write code. Rather than replacing engineers, these tools are acting as powerful assistants, reducing boilerplate code and allowing developers to focus on architecture and complex problem-solving.',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
                userId: user.id,
                categoryId: cats[0].id // AI
            },
            {
                title: 'Understanding React Server Components',
                content: 'React Server Components (RSC) introduce a new mental model for building React applications. By rendering components on the server, developers can significantly reduce the JavaScript bundle size sent to the client, resulting in faster load times and better SEO.',
                image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
                userId: user.id,
                categoryId: cats[1].id // Web Dev
            },
            {
                title: 'Why PostgreSQL is the Ultimate Database for Modern Apps',
                content: 'Moving from NoSQL databases like MongoDB to relational databases like PostgreSQL offers tremendous benefits in data integrity and complex querying capabilities. With JSONB support, Postgres gives you the best of both worlds: strict schemas and flexible documents.',
                image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
                userId: user.id,
                categoryId: cats[1].id // Web Dev
            },
            {
                title: 'Machine Learning vs. Deep Learning: A Simple Guide',
                content: 'While Machine Learning (ML) uses algorithms to parse data, learn from it, and make informed decisions, Deep Learning structures algorithms in layers to create an "artificial neural network" that can learn and make intelligent decisions on its own.',
                image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80',
                userId: user.id,
                categoryId: cats[2].id // Data Science
            },
            {
                title: 'Zero Trust Architecture in 2024',
                content: 'The traditional "castle and moat" security model is obsolete. Zero Trust architecture operates on the principle of "never trust, always verify", requiring strict identity verification for every person and device trying to access resources on a private network.',
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
                userId: user.id,
                categoryId: cats[3].id // Cybersecurity
            },
            {
                title: 'Getting Started with Docker and Docker Compose',
                content: 'Containerization has revolutionized deployment. Docker allows you to package an application with all of its dependencies into a standardized unit for software development. Docker Compose takes this a step further by letting you define and run multi-container applications.',
                image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80',
                userId: user.id,
                categoryId: cats[4].id // Cloud Computing
            },
            {
                title: 'The Rise of Prompt Engineering',
                content: 'As Large Language Models become more prevalent, the skill of communicating effectively with these AIs—known as Prompt Engineering—is becoming highly sought after. Crafting the right prompt can be the difference between a mediocre output and a highly accurate, useful response.',
                image: 'https://images.unsplash.com/photo-1655393001768-d946c98d6915?auto=format&fit=crop&w=800&q=80',
                userId: user.id,
                categoryId: cats[0].id // AI
            },
            {
                title: 'Building RESTful APIs with Express and Sequelize',
                content: 'Express.js remains one of the most popular web frameworks for Node.js. When paired with Sequelize, a modern TypeScript and Node.js ORM for Postgres, MySQL, MariaDB, SQLite and SQL Server, you can build robust and scalable APIs rapidly.',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                userId: user.id,
                categoryId: cats[1].id // Web Dev
            },
            {
                title: 'Data Cleaning: The Hidden 80% of Data Science',
                content: 'Before training any complex models, data scientists spend the majority of their time cleaning and preprocessing data. Handling missing values, removing duplicates, and normalizing data formats are crucial steps for ensuring accurate model predictions.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                userId: user.id,
                categoryId: cats[2].id // Data Science
            },
            {
                title: 'Understanding Multi-Factor Authentication (MFA)',
                content: 'Passwords are no longer enough to secure user accounts. Multi-Factor Authentication adds an additional layer of security by requiring users to provide two or more verification factors to gain access to a resource such as an application or online account.',
                image: 'https://images.unsplash.com/photo-1614064641936-38998978ae13?auto=format&fit=crop&w=800&q=80',
                userId: user.id,
                categoryId: cats[3].id // Cybersecurity
            }
        ]);

        console.log('* 10 sample English blog posts loaded successfully.');
    } catch (error) {
        console.error('Sync Error:', error);
    }
};