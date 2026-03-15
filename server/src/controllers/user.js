"use strict"
const { User } = require("../models/index");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
        */
        const data = await User.findAll();
        res.status(200).send({
            error: false,
            count: data.length,
            result: data,
        });
    },
    create: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: 'testuser',
                    password: 'Password123',
                    email: 'test@mail.com',
                    firstName: 'Recep',
                    lastName: 'Demir'
                }
            }
        */
        const data = await User.create(req.body);
        res.status(201).send({
            error: false,
            result: data,
        });
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
        const data = await User.findByPk(req.params.id);
        res.status(200).send({
            error: false,
            result: data,
        });
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                schema: {
                    firstName: 'New Name',
                    lastName: 'New Surname',
                    city: 'Istanbul'
                }
            }
        */
        const data = await User.create(req.body);
        res.status(201).send({
            error: false,
            result: data,
        });
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
        const data = await User.findByPk(req.params.id);
        res.status(200).send({
            error: false,
            result: data,
        });
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
        */
        const [updatedRows] = await User.update(req.body, {
            where: { id: req.params.id },
            individualHooks: true
        });
        const data = await User.findByPk(req.params.id);
        res.status(202).send({
            error: false,
            result: data,
        });
    },
    remove: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */
        const data = await User.destroy({ where: { id: req.params.id } });
        if (data) {
            res.sendStatus(204);
        } else {
            res.errorStatusCode = 404;
            throw new Error('Not Found.');
        }
    },
};