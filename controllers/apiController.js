const express = require('express');

const breeze = require('../lib/breeze')
const getDummyGarments = breeze.buildOutfit

const router = express.Router();

// garment index
router.get('/garments', async (req,res, next) => {
  try {
    console.log("hittin' that get");
<<<<<<< HEAD
    console.log(req.session)
    res.json(dummyClothes)
=======
    res.json(await getDummyGarments())
>>>>>>> ff460929e166c24f295a62d2704d0c4a98734e22
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
