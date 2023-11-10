const express = require('express');
const router = express.Router();
const { browseListings } = require('../controllers/browse');

router.route('/').get(browseListings);

module.exports = router;
