const router = require('express').Router()
const { createCategory, createCategoryByDefault, getCategories } = require('../controllers/categories.controller')
const {verifyToken} = require('../config/jwt.js')

router.post('/new', verifyToken, createCategory)
router.post('/default', createCategoryByDefault)
// router.get('/all', verifyToken, getCategories)

module.exports = router