const express = require("express");
const router = express.Router();
const {
    getALL,
    addONE,
    deleteONE,
    getOne
} = require("../controller/url");
const {
    ensurAuthanticated
} = require('../Config/auth')

router.route("/").get(getALL).post(ensurAuthanticated, addONE);
router.route("/:id").delete(deleteONE);
router.route("/:shortURL").get(getOne);

module.exports = router;