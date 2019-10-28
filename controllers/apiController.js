const express = require('express');

const router = express.Router();

const dummyClothes = [
  {
    name: 'greyish button-up',
    role: 'top',
    layer: 'mid',
    precip: 'both',
  },
  {
    name: 'green tank',
    role: 'top',
    layer: 'inner',
    precip: 'both',
  },
  {
    name: 'orange sweater',
    role: 'top',
    layer: 'mid',
    precip: 'both',
  },
  {
    name: 'grey boxers',
    role: 'bottom',
    layer: 'inner',
    precip: 'both',
  },
  {
    name: 'red shorts',
    role: 'bottom',
    layer: 'mid',
    precip: 'both',
  },
  {
    name: 'purple jeans',
    role: 'bottom',
    layer: 'mid',
    precip: 'both',
  },
  {
    name: 'black ballcap',
    role: 'head',
    layer: 'outer',
    precip: 'dry',
  },
  {
    name: 'orange scarf',
    role: 'head',
    layer: 'inner',
    precip: 'both',
  },
  {
    name: 'brown leather brogues',
    role: 'footwear',
    layer: 'outer',
    precip: 'dry'
  }
]

// article index
router.get('/clothes', async (req,res, next) => {
  try {
    console.log("hittin' that get");
    console.log(req.session)
    res.json(dummyClothes)
  } catch (err) {
    next(err)
  }
})

// article create
router.post('/clothes', async (req,res, next) => {
  try {
    console.log("hittin that post")
    console.log(req.body)
  } catch (err) {
    next(err)
  }
})

// article update
router.put('/clothes/:id', async (req,res, next) => {
  try {
    console.log("hittin' that update");
    console.log(req.body);
  } catch (err) {
    next(err)
  }
})

// article delete
router.delete('/clothes/:id', async (req,res, next) => {
  try {
    console.log("hittin' that ol' delete route");
    console.log(req.body);
  } catch (err) {
    next(err)
  }
})

module.exports = router
