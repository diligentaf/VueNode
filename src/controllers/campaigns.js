const { Campaign } = require('../database/models')
const trunks = require('trunks-log')
const crypto = require('crypto')
// const ethers = require('ethers')
const { ethers } = require('hardhat')

const log = new trunks('CAMPAIGNS')

const index = async (_req, res) => {
  try {
    const campaigns = await Campaign.find().exec()

    res.json({ campaigns })
  } catch (error) {
    log.error(error, 'Could not retrieve campaigns: {}', error.message)
    res
      .json({ error: error, message: 'Could not retrieve campaigns' })
      .status(500)
  }
}

const store = async (req, res) => {
  const campaign = new Campaign(req.body)

  // MOOG
  // generating validator private key
  var id = crypto.randomBytes(32).toString('hex')
  var privateKey = '0x' + id
  var validator = new ethers.Wallet(privateKey)

  const [...clients] = await ethers.getSigners()
  const TokenContract = await ethers.getContractFactory('Token')
  let Token = await TokenContract.connect(clients[0]).deploy()
  // let wallet = new ethers.Wallet(privateKey);
  console.log('/////////')
  console.log(Token.address)
  console.log('/////////')
  console.log(await Token.balanceOf(validator.address))
  console.log('/////////')
  await Token.connect(clients[0]).transfer(validator.address, 1000)
  console.log('validator address : ', validator.address)
  console.log('validator balance : ', await Token.balanceOf(validator.address))
  console.log('/////////')

  try {
    const createdCampaign = await campaign.save()

    res.status(201).json({ campaign: createdCampaign })
  } catch (error) {
    log.error(error, 'Error creating campaign: {}', campaign.email)
    let errStatus = error.name === 'ValidationError' ? 400 : 500
    res.status(errStatus).json({ error })
  }
}

const show = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).exec()

    res.status(200).json({ campaign })
  } catch (error) {
    log.error(error, 'Could not find campaign: {}', req.params.id)
    res.status(500).json({ error })
  }
}

const destroy = async (req, res) => {
  try {
    await Campaign.findByIdAndRemove(req.params.id)

    res.status(204).send()
  } catch (error) {
    log.error(error, 'Error finding campaign: {}', req.params.id)
  }
}

const update = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec()

    res.status(200).json({ campaign })
  } catch (error) {
    log.error(error, 'Could not update campaign: {}', req.params.id)
    res.status(500).json({ error })
  }
}

module.exports = { index, store, show, destroy, update }
