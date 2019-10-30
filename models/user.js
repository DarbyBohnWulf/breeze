const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  closet: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garment'
  }],
  outfits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Outfit'
  }],
  ootd: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garment'
  }],
})

const User = mongoose.model('User', userSchema)

module.exports = User
