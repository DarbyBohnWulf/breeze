const express = require('express');
const request = require('superagent')
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
    const editedGarment = await Garment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      )
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
        $in: [ req.params.id ]
      }
    })
    const containingOutfits = await Outfit.updateMany({
      garments: {
        $in: [ req.params.id ]
      }
    },
    {
      $pull: {
        garments: req.params.id
      }
    })
    owningUser.closet.remove(req.params.id)
    await owningUser.save()
    res.json(deletedGarment)
  } catch (err) {
    next(err)
  }
})

// garment show
router.get('/garments/:id', async (req,res, next) => {
  try {
    const garment = await Garment.findById(req.params.id)
    res.json(garment)
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
        .populate('closet')
        .populate({path: 'outfits', populate: {path: 'garments'}})
        .populate('ootd')
        .exec()
      outfits = owningUser.outfits.toObject()
      if (owningUser.ootd.length === 0) {
        const weather = await request
          .get(`:${process.env.PORT}/api/weather`)
          .catch(console.error)
        console.log('garments\n',owningUser.closet)
        console.log('ootd before\n', owningUser.ootd)
        const sortedGarments = await getSortedGarments(owningUser.closet)
        const parsedWeather = breeze.parseWeatherData(weather.body)
        const recommendation = await breeze.buildOutfit(sortedGarments, parsedWeather)
        console.log('recco\n', recommendation)
        recommendation.forEach(async r => {
          owningUser.ootd.push(r)
          await owningUser.save()
        });
        console.log('ootd before\n', owningUser.ootd)
      }
      const newOutfit = new Outfit({ garments: owningUser.ootd })
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
    res.json(outfits.reverse())
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

      //remove this?
      createdOutfit = await Outfit.findOne(createdOutfit).populate('garments')
    } else {
      const garments = await Outfit.find({_id: {$in: req.body.garments}})
      console.log("garments\n",garments)
      createdOutfit = await Outfit.create(req.body)
    }
    //await createdOutfit.populate({path: 'garments', model: 'Garment'})
    res.status(201).json(createdOutfit)
  } catch (err) {
    next(err)
  }
})

// outfit update
router.put('/outfits/:id', async (req,res, next) => {
  try {
    const updatedOutfit = await Outfit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      )
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
        $in: [ req.params.id ]
      }
    })
    owningUser.outfits.remove(req.params.id)
    await owningUser.save()
    res.json(deletedOutfit)
  } catch (err) {
    next(err)
  }
})

// weather route
router.get('/weather', async (req,res, next) => {
  try {
    let zip
    if (req.query.zip) {
      zip = req.query.zip
    } else zip = 60611
    const weatherResponse = await request
      .get('api.openweathermap.org/data/2.5/weather')
      .query({ zip: zip + ',us', APPID: process.env.API_KEY, units: 'imperial' })
      .catch()
    res.json(weatherResponse.body)
  } catch (err) {
    next(err)
  }
})

module.exports = router
