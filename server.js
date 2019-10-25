const express = require('express')

const app = express()
const PORT = 3000

//Connect to MongoDB
require('./db/db.js')

app.use(express.urlencoded({ extended: false }))

const userController = require('./controllers/userController.js')
app.use('/users', userController)

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`)
})
