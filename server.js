const express = require('express')
const session = require('express-session')
const methodOverride = require('method-override')

const app = express()
const PORT = 3000

//Connect to MongoDB
require('./db/db.js')

app.use(express.static('public'))

// allow methods besides GET and POST
app.use(methodOverride('_method'))

app.use(session({
    secret: 'replace this wiejfo;awijf;oaiwj',
    resave: true,
    saveUninitialized: true,
}))

app.use(express.urlencoded({ extended: false }))

const userController = require('./controllers/userController.js')
app.use('/users', userController)

const closetController = require('./controllers/closetController.js')
app.use('/closet', closetController)

const apiController = require('./controllers/apiController.js')
app.use('/api', apiController)

//Error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.json(err)
})

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`)
})
