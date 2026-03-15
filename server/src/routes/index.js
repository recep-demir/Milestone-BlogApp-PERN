"use strict"

const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use("/user", require("./user"));
router.use("/token", require("./token"));
router.use('/blogs', require('./blog'))

router.use("/categories", require("./category"));
router.use("/comments", require("./comment"));


router.use('/documents', require('./document'));


module.exports = router