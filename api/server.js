const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const usersRouter = require('./users/users-router')
const itemsRouter = require('./items/items-router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/users', usersRouter)
server.use('/items', itemsRouter)

server.get('/welcome', (req, res) => {
  res.json({
    message: 'Welcome--server is working!'
  })
})

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server
