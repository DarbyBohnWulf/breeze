const mongoose = require('mongoose')

const connStr = 'mongodb://localhost/breeze'

mongoose.connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected to ${connStr}`)
})

mongoose.connection.on('disconnected', () => {
    console.log(`MongoDB disconnected`)
})

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose had an error: ${err}`)
})
