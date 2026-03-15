"use strict"

const router = require('express').Router()
const blog = require('../controllers/blog')
const {isLogin} = require('../middlewares/permissions')

router.route('/')
  .get(blog.list)
  .post(isLogin, blog.create)

router.route('/:id')
  .get(blog.read)
  .put(blog.update)
  .patch(blog.update)
  .delete(blog.deletee)

  router.post('/:id/toggle-like', isLogin, blog.toggleLike)

module.exports = router