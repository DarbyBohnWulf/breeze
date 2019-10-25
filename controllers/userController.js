const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user.js')

router.get('/login', (req, res) => {
    res.render('users/login.ejs')
})

router.post('/login', async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const foundUser = await User.findOne({username: username})
        if (!foundUser) {
            res.redirect('/users/login')
        } else {
            if(bcrypt.compareSync(password, foundUser.password)) {
                req.session.loggedIn = true
                req.session.username = foundUser.username
                req.session.userId = foundUser._id
                res.send('you have no clothes' + req.session.username)
            } else {
                res.redirect('/users/login')
            }
        }
    } catch (err) {
        res.json(err)
    }
})

router.post('/register', async (req, res, next) => {
    const username = req.body.username
    const hashedPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    
    try {
        const foundUser = await User.findOne({username: username})
        if(foundUser) {
            res.send('already taken')
        } else {
            User.create({
                username: username,
                password: hashedPass,
            })
            res.send('created securely')
        }
    } catch (err) {
        res.json(err)
    }
})

module.exports = router
