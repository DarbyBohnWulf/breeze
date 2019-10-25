const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

router.post('/login', (req, res, next) => {
    res.redirect('/users/login')
})

router.post('/register', async (req, res, next) => {
    const username = req.body.username

    try {
        const foundUser = await User.findOne({username: username})
        if(foundUser) {
            res.send('already taken')
        } else {
            User.create(req.body)
            res.send('created')
        }
    } catch (err) {
        res.json(err)
    }
})

module.exports = router
