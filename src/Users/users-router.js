const express = require('express')
const usersRouter = express.Router()
const jsonBodyParser = express.json()
const  userService = require('./user-service')

usersRouter.get('/', (req, res) => {
  res 
    .status(200)
    .send('Hello! Endpoint hit!')
})

usersRouter.post('/register', jsonBodyParser, (req, res) => {
  console.log(req.body)
})

usersRouter.post('/login', jsonBodyParser, (req, res)=> {
  console.log(req.body)
})

module.exports = usersRouter