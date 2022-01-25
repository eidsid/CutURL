const express = require("express");
const router = express.Router();
const {
    signUpPage,
    signUp,
    logInPage,
    logIn,
    logOut
} = require("../controller/login.js");
router.route("/register").get(signUpPage).post(signUp);
router.route("/login").get(logInPage).post(logIn);

module.exports = router;