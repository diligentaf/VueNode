const express = require('express')
const { campaignController } = require('../controllers/index')

const router = express.Router()

router.get('/', campaignController.index)

router.post('/', campaignController.store)

router.get('/:id', campaignController.show)

router.delete('/:id', campaignController.destroy)

router.put('/:id', campaignController.update)

module.exports = router
