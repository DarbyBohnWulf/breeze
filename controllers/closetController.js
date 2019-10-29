const express = require('express')
const router = express.Router()

const Outfit = require('../models/outfit.js')

router.get('/', (req, res, next) => {
    req.session.test = "hi"
    console.log("\nhere is req.session in GET /closet", req.session)
    res.render('closet/index.ejs')
})

router.get('/outfits', (req, res, next) => {
    res.render('closet/outfits.ejs')
})

module.exports = router
