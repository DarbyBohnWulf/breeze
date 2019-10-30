const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('closet/index.ejs', {
        session: req.session
    })
})

router.get('/outfits', (req, res, next) => {
    res.render('closet/outfits.ejs')
})

module.exports = router
