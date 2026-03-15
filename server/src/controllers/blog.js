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
                    { model: User, attributes: ["username", "firstName", "lastName"] }
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
                { model: User, attributes: ["username", "firstName", "lastName"] }
            ]
        });

        // EKLENEN KISIM: Ziyaret edilince sayıyı 1 artır ve kaydet
        if (data) {
            data.countOfVisitors = (data.countOfVisitors || 0) + 1;
            await data.save();
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
    


    read: async (req, res) => {
        let data = await Blog.findByPk(req.params.id, {
            include: [
                { model: Category, attributes: ["name"] },
                { model: User, attributes: ["username", "firstName", "lastName"] }
            ]
        });

        // DÜZELTME: Okunma sayısını artırıp kaydet
        if (data) {
            data.countOfVisitors = (data.countOfVisitors || 0) + 1;
            await data.save();
        }

        res.status(200).send({
            error: false,
            result: data
        });
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
                // Önceden beğenmişse, beğeniyi geri çek
                currentLikes = currentLikes.filter((id) => id !== userId);
            } else {
                // Beğenmediyse, ekle
                currentLikes.push(userId);
            }

            blog.likes = currentLikes;
            blog.changed('likes', true); // DÜZELTME: Postgres array güncellemelerinde bu ZORUNLUDUR
            await blog.save();

            res.status(200).send({
                error: false,
                result: blog
            });
        } catch (error) {
            res.status(500).send({ error: true, message: error.message });
        }
    },
};
