const express = require("express");
const router = express.Router();
const {
    ensurAuthanticated,
    ensureNotAuthenticated
} = require('../Config/auth')

const {
    signUpPage,
    signUp,
    logInPage,
    logIn,
    logOut
} = require("../controller/users.js");
router.route("/register").get(ensureNotAuthenticated, signUpPage).post(ensureNotAuthenticated, signUp);
router.route("/login").get(ensureNotAuthenticated, logInPage).post(ensureNotAuthenticated, logIn);
router.route("/logout").get(ensurAuthanticated, logOut);

module.exports = router;