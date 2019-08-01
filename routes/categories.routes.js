const router = require('express').Router()
const { createCategory, createCategoryByDefault, getCategories, deleteOneCategory } = require('../controllers/categories.controller')
const {verifyToken} = require('../config/jwt.js')

router.post('/new', verifyToken, createCategory)
router.post('/default', createCategoryByDefault)
router.post('/:id', deleteOneCategory)

module.exports = router