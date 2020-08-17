const { check, validationResult } = require("express-validator/check");

exports.signupvalidator = [
    check("username", "Please Enter a Valid Username")
    .not()
    .isEmpty(),
    check("email", "Please enter a valid email").isEmail()
    .not()
    .isEmpty(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
    .not()
    .isEmpty(),
]

exports.signinvalidator = [
    check("email", "Please enter a valid email").isEmail()
    .not()
    .isEmpty(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
    .not()
    .isEmpty(),
]

