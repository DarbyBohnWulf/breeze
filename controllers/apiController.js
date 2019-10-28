const express = require('express');

const breeze = require('../lib/breeze')
const getDummyGarments = breeze.buildOutfit

const router = express.Router();

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
  } catch (err) {
    next(err)
  }
})

// garment update
router.put('/garments/:id', async (req,res, next) => {
  try {
    console.log("hittin' that update");
    console.log(req.body);
  } catch (err) {
    next(err)
  }
})

// garment delete
router.delete('/garments/:id', async (req,res, next) => {
  try {
    console.log("hittin' that ol' delete route");
    console.log(req.body);
  } catch (err) {
    next(err)
  }
})

module.exports = router
