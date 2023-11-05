const express = require('express')
const router = express.Router()
const {
    getAllListings,
    getListing,
    addListing,
    deleteListing,
    updateListing,
} = require('../controllers/car')

router.route('/')
    .get(getAllListings)
    .post(addListing)

router.route('/:id')
    .get(getListing)
    .delete(deleteListing)
    .patch(updateListing)

module.exports = router

