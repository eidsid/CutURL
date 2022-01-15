const express = require('express');
const router = express.Router()
const {
    getALL,
    addONE,
    deleteONE,
    getOne
} = require('../controller/url')
router.route('/').get(getALL).post(addONE)
router.route('/:id').get(getOne).delete(deleteONE)

module.exports = router