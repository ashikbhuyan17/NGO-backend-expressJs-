const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const { addCategory, getCategories } = require('../controller/category')
const { requireSignIn, adminMiddleware, userMiddleware } = require('../common-middleware')

router.post('/category/create', requireSignIn, adminMiddleware, addCategory)
router.get('/category/getCategory', requireSignIn, adminMiddleware, getCategories)

module.exports = router
