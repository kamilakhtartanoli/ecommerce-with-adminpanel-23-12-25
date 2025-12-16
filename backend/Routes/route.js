const express = require('express')
const {productfunction, allproducts, admincreate, adminlogin, deleteproduct, updateproduct} = require('../controller/controller.js')
const { products } = require('../models/product.js')

const router = express.Router()

router.post('/product',productfunction)
router.post('/adminlogin',adminlogin)
router.post('/admincreate',admincreate)
router.get('/allproducts',allproducts)
router.get("/product/:id", async (req, res) => {
  const product = await products.findById(req.params.id);
  res.json(product);
});
router.delete('/deleteproduct/:id',deleteproduct)
router.put('/updateproduct/:id',updateproduct)

module.exports = {
    router
}