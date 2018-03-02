const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const productsRouter = require('./products/router')

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

app.use(productsRouter)
