const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../../models/product')

// 'GET' all products
router.get('/', (req, res, next) => {
  Product.find()
  .exec()
  .then(docs => {
    console.log(docs);
    if (docs.length > 0) {
      res.status(200).json(docs);
    } else {
        res.status(404).json({
            message: 'No entries found'
        });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
})

// 'POST' a product 
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

// ====================================================================

// GET specific product/{id}
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

// PATCH/UPDATE specific products/{id}
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// DELETE specific products/{id}
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  Product.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
})

module.exports = router