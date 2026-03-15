"use strict"
const { Category } = require("../models/index");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "List Categories"
        */
        const data = await Category.findAll();
        res.status(200).send({ error: false, count: data.length, result: data });
    },
    create: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Create Category"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { name: 'Technology' }
            }
        */
        const data = await Category.create(req.body);
        res.status(201).send({ error: false, result: data });
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Get Single Category"
        */
        const data = await Category.findByPk(req.params.id);
        res.status(200).send({ error: false, result: data });
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Update Category"
            #swagger.parameters['body'] = {
                in: 'body',
                schema: { name: 'New Category Name' }
            }
        */
        await Category.update(req.body, { where: { id: req.params.id } });
        const data = await Category.findByPk(req.params.id);
        res.status(202).send({ error: false, result: data });
    },
    remove: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Delete Category"
        */
        const data = await Category.destroy({ where: { id: req.params.id } });
        res.sendStatus(data ? 204 : 404);
    },
};