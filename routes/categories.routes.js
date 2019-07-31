const router = require('express').Router()
const { createCategory, createCategoryByDefault } = require('../controllers/categories.controller')
const {verifyToken} = require('../config/jwt.js')

router.post('/new', verifyToken, createCategory)
router.post('/default', createCategoryByDefault)

module.exports = router