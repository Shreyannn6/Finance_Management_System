const express = require('express')
const database = require('./config/database.js')
const {registerUser} = require('./controllers/users/userCtrl')
const userRoute = require('./routes/users/userRoute.js')
const {errorHandler, pageNotFound} = require('./middlewares/errorHandler.js')

const app = express()

app.use(express.json())

app.use('/',userRoute)
// app.use('/',pageNotFound)

app.use(pageNotFound)
app.use(errorHandler)


module.exports = app