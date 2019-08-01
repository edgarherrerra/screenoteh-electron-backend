const router = require('express').Router()
const { createComment } = require('../controllers/comments.controller')
const {verifyToken} = require('../config/jwt.js')

router.post('/new', verifyToken, createComment)

module.exports = router