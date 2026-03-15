"use strict"

const router = require('express').Router()
const comment = require('../controllers/comment')
const permissions = require('../middlewares/permissions')

router.route('/')
    .get(comment.list)
    .post(permissions.isLogin, comment.create)

router.route('/:id')
    .get(permissions.isLogin, comment.read)
    .put(permissions.isLogin, comment.update)
    .patch(permissions.isLogin, comment.update)
    .delete(permissions.isLogin, comment.remove) // BURASI DEĞİŞTİ

module.exports = router