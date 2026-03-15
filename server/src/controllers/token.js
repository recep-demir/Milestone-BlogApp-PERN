"use strict"

const { Token } = require("../models/index");

module.exports = {
    list: async (req, res) => {
        // #swagger.ignore = true
        const data = await Token.findAll();
        res.status(200).send({ error: false, result: data });
    },
    create: async (req, res) => {
        // #swagger.ignore = true
        const data = await Token.create(req.body);
        res.status(201).send({ error: false, result: data });
    },
    read: async (req, res) => {
        // #swagger.ignore = true
        const data = await Token.findByPk(req.params.id);
        res.status(200).send({ error: false, result: data });
    },
    update: async (req, res) => {
        // #swagger.ignore = true
        await Token.update(req.body, { where: { id: req.params.id } });
        const data = await Token.findByPk(req.params.id);
        res.status(202).send({ error: false, result: data });
    },
    remove: async (req, res) => {
        // #swagger.ignore = true
        const data = await Token.destroy({ where: { id: req.params.id } });
        res.sendStatus(data ? 204 : 404);
    },
};