const express = require('express')
const {registerUser,fetchUsers} = require('../../controllers/users/userCtrl')

const userRoute = express.Router()

userRoute.post('/register', registerUser )
userRoute.get('/users',fetchUsers)

module.exports = userRoute;