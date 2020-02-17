const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../../models/product')

// Handle incoming GET request for products
router.get('/', (req, res, next) => {
  res.status(200).json({
    msg: 'GET It works tooooooooooooo'
  })
})

// Handle incoming POST request for products
router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })

  product
  .save()
  .then((result) => {
    console.log('result', result)
    res.status(200).json({
      msg: 'Handling POST request to /products',
      createdProduct: result
    })
  })
  .catch((err) => {
    console.log('err', err)
    res.status(500).json({
      error: err
    })
  })
})

// Handle incoming GET request for products/{id}
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
  .exec()
  .then(doc => {
    console.log("From database", doc)
    if (doc) {
      res.status(200).json(doc)
    } else {
      res
      .status(404)
      .json({ message: "No valid entry found for provided ID" })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: err })
  })
  console.log('damn it', req.params)
})

// Handle incoming PATCH request for products/{id}
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId
  res.status(200).json({
    msg: 'UPDATE',
    id
  })
})

// Handle incoming DELETE request for products/{id}
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  res.status(200).json({
    msg: 'DELETE',
    id
  })
})

module.exports = router