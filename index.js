const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const productsRouter = require('./products/router')
const usersRouter = require('./users/router')
const authRouter = require('./authentication/router')
const tokenMiddleware = require('./authentication/middleware').tokenMiddleware

const app = express()

app.listen(4001, () => {
  console.log('Express API listening on port 4001')
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.use(bodyParser.json())
app.use(tokenMiddleware)

app.use(productsRouter)
app.use(usersRouter)
app.use(authRouter)
