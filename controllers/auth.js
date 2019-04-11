const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'login',
        isAuthenticated: false
    })
}

exports.postLogin = (req, res, next) => {
    // set a header 
    User.findById("5ca795ae329d5d22945c662a")
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
        })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}