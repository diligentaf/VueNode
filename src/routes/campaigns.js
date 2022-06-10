const express = require('express')
const { campaignsController } = require('../controllers/index')

const router = express.Router()

router.get('/', campaignsController.index)

router.post('/', campaignsController.store)

router.get('/:id', campaignsController.show)

router.delete('/:id', campaignsController.destroy)

router.put('/:id', campaignsController.update)

module.exports = router
