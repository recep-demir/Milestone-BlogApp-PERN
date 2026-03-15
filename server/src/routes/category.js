"use strict";

const router = require("express").Router();

const { list, create, read, update, deletee } = require('../controllers/category');
const { isAdmin } = require('../middlewares/permissions');


router.route('/').get(list).post(isAdmin,create);
router.route('/:id').get(read).put(isAdmin,update).patch(isAdmin,update).delete(isAdmin,deletee)

module.exports = router

