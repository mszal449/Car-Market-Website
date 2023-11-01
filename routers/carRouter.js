const express = require('express')
const router = express.Router()
const {
    getAllProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/car')


router.route('/').get(getAllProducts)
router.route('/:id')
    .get(getProduct)
    .get(addProduct)
    .delete(deleteProduct)
    .post(updateProduct)


module.exports = router

