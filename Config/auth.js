const ensurAuthanticated = (req, res, next) => {

    if (req.isAuthenticated, req.user) {
        // console.log('auth true')
        return next();
    } else {
        // console.log('auth false')
        req.flash('error_msg', 'please login frist')
        res.redirect('/users/login')

    }
}
const ensureNotAuthenticated = (req, res, next) => {
    if (!req.user) {
        // console.log('your are not login')
        return next();

    } else {
        // console.log('auth exist');
        // console.log(req.user);
        req.flash('success_msg', 'you alerdy login')
        res.redirect('/')
    }
}
module.exports = {
    ensurAuthanticated,
    ensureNotAuthenticated
}