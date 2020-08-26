const { check, validationResult } = require("express-validator");

exports.queryvalidator = [
    check("name", "Please enter your name")
    .not()
    .isEmpty(),
    check("email", "Please use a valid email").isEmail()
    .not()
    .isEmpty(),
    check("message", "Please send a valid message")
    .not()
    .isEmpty(),
]