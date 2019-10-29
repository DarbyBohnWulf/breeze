const express = require('express');

const breeze = require('../lib/breeze')
const getDummyGarments = breeze.getDummyGarments

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

router.get('/outfits', (req, res, next) => {
  try {
    const outfits = []

    res.json(outfits)
  } catch (err) {
    next(err)
  }
})

module.exports = router
