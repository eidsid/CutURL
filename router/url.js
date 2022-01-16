const express = require("express");
const router = express.Router();
const { getALL, addONE, deleteONE, getOne } = require("../controller/url");
router.route("/").get(getALL).post(addONE);
router.route("/:id").delete(deleteONE);
router.route("/:shortURL").get(getOne);

module.exports = router;
