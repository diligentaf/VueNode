const mongoose = require('mongoose')

const definition = {
  campaignID: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  contractAddress: {
    type: String,
    required: true,
  },
  contractType: {
    type: String,
    required: true,
  },
}

const options = {
  timestamps: true,
}

const campaignSchema = new mongoose.Schema(definition, options)

module.exports = mongoose.model('campaign', campaignSchema)
