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
    refs: 'Garment'
  }],
  outfits: [{
    type: mongoose.Schema.Types.ObjectId,
    refs: 'Outfit'
  }],
  ootd: [{
    type: mongoose.Schema.Types.ObjectId,
    refs: 'Garment'
  }],
})

const User = mongoose.model('User', userSchema)

module.exports = User
