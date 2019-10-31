const express = require('express');
const Outfit = require('../models/outfit.js')

const breeze = require('../lib/breeze')
const getDummyGarments = breeze.getDummyGarments
const getSortedGarments = breeze.getSortedGarments
const buildOutfit = breeze.buildOutfit
const User = require('../models/user')
const Garment = require('../models/garment')

const router = express.Router()

// garment index
router.get('/garments', async (req,res, next) => {
  try {
    let garments
    // check if the user is logged in
    if (req.session.userId) {
      const user = await User.findById(req.session.userId)
        .populate('closet')
        .exec()
      garments = user.closet
    } else {
      garments = await getDummyGarments()
    }
    console.log(garments)
    res.json(garments)
  } catch (err) {
    next(err)
  }
})

// garment create
router.post('/garments', async (req,res, next) => {
  try {
    const user = await User.findById(req.session.userId)
    const newGarment = await Garment.create(req.body)
    user.closet.push(newGarment)
    await user.save()
    res.status(201).json(newGarment)
  } catch (err) {
    next(err)
  }
})

// garment update
router.put('/garments/:id', async (req,res, next) => {
  try {
    const editedGarment = await Garment.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).json(editedGarment)
  } catch (err) {
    next(err)
  }
})

// garment delete
router.delete('/garments/:id', async (req,res, next) => {
  try {
    const deletedGarment = await Garment.findByIdAndDelete(req.params.id)
    const owningUser = await User.findOne({
      closet: {
        $in: [ deletedGarment._id ]
      }
    })
    const containingOutfit = await Outfit.findOne({
      garments: {
        $in: [ deletedGarment._id ]
      }
    })
    owningUser.closet.remove(deletedGarment)
    if (containingOutfit.garments) {
      containingOutfit.garments.remove(deletedGarment)
      await Promise.all([
        owningUser.save(),
        containingOutfit.save()
      ])
    } else {
      await owningUser.save()
    }
    res.json(deletedGarment)
  } catch (err) {
    next(err)
  }
})

// outfit index
router.get('/outfits', async (req, res, next) => {
  try {
    let outfits = []
    if (req.session.userId) {
      const owningUser = await User.findById(req.session.userId)
        .populate({path: 'outfits', populate: {path: 'garments'}})
        .populate('ootd')
        .exec()
      outfits = owningUser.outfits.toObject()
      console.log(outfits)
      const newOutfit = new Outfit({ garments: owningUser.ootd.garments })
      outfits.push({ garments: newOutfit.garments, _id: newOutfit._id })
    } else {
      const dummyGs = await getDummyGarments()
      const sortedGs = await getSortedGarments(dummyGs)
      const outfit1 = {garments: await buildOutfit(sortedGs), _id: 'abc'}
      const outfit2 = {garments: await buildOutfit(sortedGs), _id: 'def'}
      outfits = [
        outfit1, outfit2
      ]
    }
    res.json(outfits)
  } catch (err) {
    next(err)
  }
})

// outfit create
router.post('/outfits', async (req, res, next) => {
  try {
    let createdOutfit
    if (req.session.userId) {
      console.log("req.body\n",req.body)
      const owningUser = await User.findById(req.session.userId)
      createdOutfit = await Outfit.create({name: req.body.name, garments: req.body["garments[]"]})
      owningUser.outfits.push(createdOutfit)
      await owningUser.save()
    } else {
      const garments = await Outfit.find({_id: {$in: req.body.garments}})
      console.log("garments\n",garments)
      createdOutfit = await Outfit.create(req.body)
    }
    res.status(201).json(createdOutfit)
  } catch (err) {
    next(err)
  }
})

// outfit update
router.put('/outfits/:id', async (req,res, next) => {
  try {
    const updatedOutfit = await Outfit.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).json(updatedOutfit)
  } catch (err) {
    next(err)
  }
})

// outfit delete
router.delete('/outfits/:id', async (req,res, next) => {
  try {
    const deletedOutfit = await Outfit.findByIdAndDelete(req.params.id)
    const owningUser = await User.findOne({
      outfits: {
        $in: [ deletedOutfit._id ]
      }
    })
    owningUser.outfits.remove(deletedOutfit._id)
    res.json(deletedOutfit)
  } catch (err) {
    next(err)
  }
})

module.exports = router
