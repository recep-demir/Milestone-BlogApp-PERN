// server/src/routes/blog.js
"use strict"

const router = require('express').Router()
const blog = require('../controllers/blog')
const permissions = require('../middlewares/permissions')

router.route('/')
    .get(blog.list)
    .post(permissions.isLogin, blog.create)

router.route('/:id')
    .get(blog.read)
    .put(permissions.isLogin, blog.update)
    .patch(permissions.isLogin, blog.update)
    .delete(permissions.isLogin, blog.remove) 

// EKLENEN YENİ ROUTE:
router.route('/:id/postLike')
    .post(permissions.isLogin, blog.toggleLike)

module.exports = router