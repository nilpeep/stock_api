"use strict"

const router = require('express').Router()

//? purchase router:

const purchase = require('../controllers/purchase')
const permissions = require('../middlewares/permissions')

// URL: /purchases

router.route('/')
.get(permissions.isStaff, purchase.read)
.post(permissions.isAdmin, purchase.create)

router.route('/:id')
.get(permissions.isStaff, purchase.read)
.put(permissions.isAdmin, purchase.update)
.patch(permissions.isAdmin, purchase.update)
.delete(permissions.isAdmin, purchase.delete)

module.exports = router