const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    req.session.test = "hi"
    console.log("\nhere is req.session in GET /closet", req.session)
    res.render('closet/index.ejs')
})

module.exports = router
