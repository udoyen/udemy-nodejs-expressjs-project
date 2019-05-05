const path = require("path");
const User = require('../models/user');

const express = require("express")
const { check, body } = require('express-validator/check'); // object destructing syntax

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);
router.post('/login', authController.postLogin);

router.post('/signup',
    [
        check('email')
            .isEmail()
            .withMessage()
            .custom(async (value, { req }) => {
                const userDoc = await User.findOne({ email: value });
                if (userDoc) {
                    return Promise.reject('E-Mail exists already, please pick a different one.');
                }
            }),
        body(
            'password',
            'Please enter a password with only numbers and text and at least 5 characters.'
        )
            .isLength({ min: 5 })
            .isAlphanumeric(),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords have to match!');
                }
                return true;
            })

    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;