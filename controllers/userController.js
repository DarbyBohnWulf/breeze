const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

router.post('/login', (req, res, next) => {
    res.redirect('/users/login')
})

router.post('/register', (req, res, next) => {
    console.log(req.body)
})

module.exports = router
