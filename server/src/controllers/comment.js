"use strict"
const { Comment, User, Blog } = require("../models/index");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
        */
        const data = await Comment.findAll({ include: [User, Blog] });
        res.status(200).send({ error: false, count: data.length, result: data });
    },
    create: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
        */
        if (req.user) req.body.userId = req.user.id;
        const data = await Comment.create(req.body);
        res.status(201).send({ error: false, result: data });
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get Single Comment"
        */
        const data = await Comment.findByPk(req.params.id, { include: [User, Blog] });
        res.status(200).send({ error: false, result: data });
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
        */
        await Comment.update(req.body, { where: { id: req.params.id } });
        const data = await Comment.findByPk(req.params.id);
        res.status(202).send({ error: false, result: data });
    },
    remove: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Comment"
        */
        const data = await Comment.destroy({ where: { id: req.params.id } });
        res.sendStatus(data ? 204 : 404);
    },
};