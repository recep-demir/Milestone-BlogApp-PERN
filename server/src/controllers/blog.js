"use strict"
const { Blog, User, Category } = require("../models/index");

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
            // İlişkili modellerle (User ve Category) birlikte verileri getir
            const data = await Blog.findAll({ 
                include: [
                    { model: User, attributes: ['firstName', 'lastName', 'image'] },
                    { model: Category, attributes: ['name'] }
                ] 
            });
            
            res.status(200).send({ 
                error: false, 
                count: data.length, 
                result: data 
            });
        } catch (error) {
            console.error("BLOG LIST HATASI:", error);
            res.status(500).send({
                error: true,
                message: error.message
            });
        }
    },
    create: async (req, res) => {
                /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Create Blog"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
               $ref: "#/components/schemas/Blog"
            }
        }
        */
        if (req.user) req.body.userId = req.user.id;
        const data = await Blog.create(req.body);
        res.status(201).send({ error: false, result: data });
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Single Blog"
        */
        const data = await Blog.findByPk(req.params.id, { include: [User, Category] });
        if (data) await data.increment('countOfVisitors');
        res.status(200).send({ error: false, result: data });
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Update Blog"
        */
        await Blog.update(req.body, { where: { id: req.params.id } });
        const data = await Blog.findByPk(req.params.id);
        res.status(202).send({ error: false, result: data });
    },
    remove: async (req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Delete Blog"
        */
        const data = await Blog.destroy({ where: { id: req.params.id } });
        res.sendStatus(data ? 204 : 404);
    },
};