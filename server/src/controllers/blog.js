"use strict";
const { Blog, User, Category, Comment } = require("../models/index");

module.exports = {
    list: async (req, res) => {
        /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "List Blogs"
        #swagger.description = `
            You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                <li>URL/?<b>limit=10&page=1</b></li>
            </ul>
        */
        try {
            const result = await Blog.findAll({
                include: [
                    { model: Category, attributes: ["name"] },
                    { model: User, attributes: ["username", "firstName", "lastName"] },
                    { model: Comment }
                ]
            });

            res.status(200).send({
                error: false,
                count: result.length,
                result
            });
        } catch (error) {
            console.error("BLOG LIST ERROR:", error);
            res.status(500).send({ error: true, message: error.message });
        }
    },

    create: async (req, res) => {
        /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Create Blog"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/components/schemas/Blog" }
        }
        */
        if (req.user) req.body.userId = req.user.id;

        const result = await Blog.create(req.body);
        res.status(201).send({ error: false, result });
    },
    read: async (req, res) => {
                    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Get Single Blog"
        */
        const data = await Blog.findByPk(req.params.id, {
            include: [
                { model: Category, attributes: ["name"] },
                { model: User, attributes: ["username", "firstName", "lastName"] },
                { model: Comment }
            ]
        });

        // EKLENEN KISIM: Ziyaret edilince sayıyı 1 artır ve kaydet
        if (data) {
            // Sequelize'da veritabanındaki rakamı kesin olarak 1 artırmanın en güvenli yolu
            await data.increment('countOfVisitors', { by: 1 });
            data.countOfVisitors += 1; // Ekrana anında güncel sayının gitmesi için
        }

        res.status(200).send({
            error: false,
            result: data
        });
    },

    update: async (req, res) => {
        /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Update Blog"
        */
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) throw new Error("Blog not found");

        if (blog.userId !== req.user.id && !req.user.isAdmin) {
            res.errorStatusCode = 403;
            throw new Error("You are not authorized");
        }

        await Blog.update(req.body, { where: { id: req.params.id } });
        const result = await Blog.findByPk(req.params.id);

        res.status(202).send({ error: false, result });
    },
                

    remove: async (req, res) => {
        /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Delete Blog"
        */
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) throw new Error("Blog not found");

        if (blog.userId !== req.user.id && !req.user.isAdmin) {
            res.errorStatusCode = 403;
            throw new Error("You are not authorized");
        }

        await Blog.destroy({ where: { id: req.params.id } });
        res.sendStatus(204);
    },
    


    toggleLike: async (req, res) => {
        /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Toggle Like (Coming Soon)"
        #swagger.description = "Like system will be added in PostgreSQL version."
        */
        try {
            const blog = await Blog.findByPk(req.params.id);
            if (!blog) throw new Error("Blog not found");

            const userId = req.user.id; 
            let currentLikes = blog.likes || [];

            if (currentLikes.includes(userId)) {
                currentLikes = currentLikes.filter((id) => id !== userId);
            } else {
                currentLikes.push(userId);
            }

            // PostgreSQL'de Array kaydederken doğrudan Update atmak en garantili yoldur
            await Blog.update(
                { likes: currentLikes },
                { where: { id: req.params.id } }
            );

            blog.likes = currentLikes;

            res.status(200).send({
                error: false,
                result: blog
            });
        } catch (error) {
            res.status(500).send({ error: true, message: error.message });
        }
    },
};
