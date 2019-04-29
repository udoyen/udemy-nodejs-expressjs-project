const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require("../models/user");

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}));

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
    });
};


exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message
    });
};


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    // set a header 
    User.findOne({
        email: email
    })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password.');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)//returns a boolean
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }

                    req.flash('error', 'Invalid email or password.');
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};


exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (email) {
        User.findOne({ email: email })
            .then(userDoc => {
                if (userDoc) {
                    req.flash('error', 'Error Signing Up, E-Mail exists already!');
                    return res.redirect('/signup');
                }
                return bcrypt.hash(password, 12)
                    .then(hashPassword => {
                        const user = new User({
                            email: email,
                            password: hashPassword,
                            cart: { items: [] }
                        });
                        return user.save();
                    })
                    .then(result => {
                        res.redirect('/login');
                        return transporter.sendMail({
                            to: email,
                            from: 'shop@node-complete.com',
                            subject: 'Signup succeeded!',
                            html: '<html>You successfully signed up!</html>'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            });
    } else {

        req.flash('error', 'E-Mail field is empty!');
        res.redirect('/signup');
    }

};


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};
