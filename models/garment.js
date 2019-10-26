const mongoose = require('mongoose')

const garmentSchema = new mongoose.Schema({
  name: String,
  role: {
    type: String,
    enum: [
      'top', 'bottom', 'dual', 'head', 'footwear',
      'accessory', 'handwear'
    ]
  },
  layer: {
    type: String,
    enum: [
      'inner', 'mid', 'outer'
    ]
  },
  precip: {
    type: String,
    enum: [
      'wet', 'dry', 'both'
    ]
  },
})

const Garment = mongoose.model('Garment', garmentSchema)

module.exports = Garment