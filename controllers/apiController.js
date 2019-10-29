const express = require('express');
const Outfit = require('../models/outfit.js')

const breeze = require('../lib/breeze')
const getDummyGarments = breeze.getDummyGarments
const getSortedGarments = breeze.getSortedGarments
const buildOutfit = breeze.buildOutfit

const router = express.Router()

// garment index
router.get('/garments', async (req,res, next) => {
  try {
    console.log("hittin' that get");
    res.json(await getDummyGarments())
  } catch (err) {
    next(err)
  }
})

// garment create
router.post('/garments', async (req,res, next) => {
  try {
    console.log("hittin that post")
    console.log(req.body)
    res.json(req.body)
  } catch (err) {
    next(err)
  }
})

// garment update
router.put('/garments/:id', async (req,res, next) => {
  try {
    console.log("hittin' that update", req.params.id);
    console.log(req.body);
    res.send(req.body)
  } catch (err) {
    next(err)
  }
})

// garment delete
router.delete('/garments/:id', async (req,res, next) => {
  try {
    console.log("hittin' that ol' delete route");
    console.log(req.params.id);
    res.json({deleted: req.params.id})
  } catch (err) {
    next(err)
  }
})

router.get('/outfits', async (req, res, next) => {
  try {
    const dummyGs = await getDummyGarments()
    const sortedGs = await getSortedGarments(dummyGs)
    const outfit1 = {garments: await buildOutfit(sortedGs), _id: 'abc'}
    const outfit2 = {garments: await buildOutfit(sortedGs), _id: 'def'}
    const outfits = [
      outfit1, outfit2
    ]

    res.json(outfits)
  } catch (err) {
    next(err)
  }
})

router.post('/outfits', async (req, res, next) => {
    try {
      const garments = await Outfit.find({$in: {_id: req.body.garments}})
      const createdOutfit = await Outfit.create(req.body)
      res.json(createdOutfit)
    } catch (err) {
      next(err)
    }
})

module.exports = router
