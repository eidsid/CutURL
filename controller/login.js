const User = require('../models/user');
const bcrypt = require('bcrypt')

const signUpPage = async(req, res) => {
    res.render('signup')

};
const signUp = async(req, res) => {
    try {
        const cryptedPassword = await bcrypt.hash(req.body.password, 10)
        const fullName = req.body.firstName + ' ' + req.body.lastName
        const user = {
            name: fullName,
            password: cryptedPassword,
            email: req.body.email
        }

        console.log(user)
        res.redirect('/')
    } catch (error) {
        res.status(400).send(error.message)
    }


};

const logInPage = async(req, res) => {
    res.send("login page");
};
const logIn = async(req, res) => {
    res.send("login");
};
const logOut = async(req, res) => {
    res.send("logout");
};

module.exports = {
    signUpPage,
    signUp,
    logInPage,
    logIn,
    logOut
};