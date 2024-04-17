"use strict"

const router = require('express').Router()

//? Category router:

const category = require('../controllers/category')
const permissions = require('../middlewares/permissions')

// URL: /categories

router.route('/')
.get(permissions.isStaff, category.read)
.post(permissions.isAdmin, category.create)

router.route('/:id')
.get(permissions.isStaff, category.read)
.put(permissions.isAdmin, category.update)
.patch(permissions.isAdmin, category.update)
.delete(permissions.isAdmin, category.delete)

module.exports = router