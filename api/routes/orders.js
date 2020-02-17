const express = require('express')
const router = express.Router()

// Handle incoming GET request for orders
router.get('/', (req, res, next) => {
  res.status(200).json({
    msg: 'Fetch orders'
  })
})

// Handle incoming POST request for orders
router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  res.status(200).json({
    msg: 'Create order',
    order: order
  })
})

// Handle incoming GET request for orders/{id}
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId
  if (id === 'special') {
    res.status(200).json({
      msg: 'Special order',
      id
    })
  } else {
    res.status(200).json({
      msg: 'Order',
      id
    })
  }
})

// Handle incoming GET request for orders/{id}
router.patch('/:orderId', (req, res, next) => {
  const id = req.params.orderId
  res.status(200).json({
    msg: 'UPDATE order',
    id
  })
})

// Handle incoming GET request for orders/{id}
router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId
  res.status(200).json({
    msg: 'DELETE order',
    id
  })
})

module.exports = router