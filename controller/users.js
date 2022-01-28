const User = require('../models/users');
const bcrypt = require('bcrypt')
const password = require('passport')

const signUpPage = async(req, res) => {

    res.render('signup')

};
const signUp = async(req, res) => {
    let errors = []
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body
    if (!firstName || !lastName || !email || !password) {
        errors.push({
            msg: 'All fields must be filled'
        })
    }
    if (password.length < 5) {
        errors.push({
            msg: 'password must be more than 5 char'
        })
    }
    try {
        let isFound = await User.findOne({
            email: req.body.email
        })
        if (isFound) {
            errors = [{
                msg: 'exmail already register'
            }]
        } else {
            if (errors.length > 0) {

                res.render('signup', {
                    errors,
                    user: {
                        firstName,
                        lastName,
                        email,
                        password
                    }
                })
            } else {
                const cryptedPassword = await bcrypt.hash(password, 10)
                const fullName = firstName + ' ' + lastName
                const user = {
                    name: fullName,
                    password: cryptedPassword,
                    email: email
                }
                await User.create(user)
                req.flash('success_msg', 'You are now registered and you can login')
                res.redirect('/users/login')
            }
        }

    } catch (error) {
        res.render('signup', {
            errors: [{
                msg: error
            }]
        })
    }


};

const logInPage = async(req, res) => {

    res.render('login');
};

const logIn = async(req, res, next) => {

    password.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);


}
const logOut = async(req, res) => {
    req.logout();
    req.flash('success_msg', 'You Are LogOut');
    res.redirect('/');

};

module.exports = {
    signUpPage,
    signUp,
    logInPage,
    logIn,
    logOut
};