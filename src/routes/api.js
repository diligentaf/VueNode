const express = require('express')
const userRoutes = require('./users')
const campaignRoutes = require('./campaigns')

const router = express.Router()

router.use('/users', userRoutes)
router.use('/campaigns', campaignRoutes)

module.exports = router
