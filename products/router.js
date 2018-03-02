const Router = require('express').Router
const Product = require('./model')
const requireUser = require('../authentication/middleware').requireUser

const router = new Router()

router.get('/products', (req, res) => {
  Product.findAll({
    attributes: ['id', 'name', 'price']
  })
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.status(500)
      res.json({message: 'Something went wrong'})
    })
})

router.get('/products/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        res.status(404)
        res.json({ message: 'Not Found' })
      }
    })
    .catch(err => {
      res.status(500)
      res.json({ message: 'There was an error' })
    })
})

router.post('/products', requireUser, (req, res) => {
  const product = req.body
  product.userId = req.user.id

  Product.create(product)
    .then(entity => {
      res.status(201)
      res.json(entity)
    })
    .catch(err => {
      res.status(422)
      res.json({ message: err.message })
    })
})

const updateOrPatch = (req, res) => {
  const productId = Number(req.params.id)
  const updates = req.body

  Product.findById(req.params.id)
    .then(entity => {
      if (entity.userId !== req.user.id) {
        res.status(403).send({
          message: 'You\'re not allowed to edit this product!'
        })
      }
      else {
        return entity.update(updates)
      }
    })
    .then(final => {
      res.json(final)
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
}

router.put('/products/:id', requireUser, updateOrPatch)
router.patch('/products/:id', requireUser, updateOrPatch)

router.delete('/products/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(entity => {
      if (entity.userId !== req.user.id) {
        res.status(403).send({
          message: 'You\'re not allowed to delete this product!'
        })
      }
      else {
        return entity.destroy()
      }
    })
    .then(_ => {
      res.send({
        message: 'The product was deleted succesfully'
      })
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})

module.exports = router
