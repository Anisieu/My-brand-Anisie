const { check, validationResult } = require("express-validator");

exports.commentvalidator = [
    check("name", "Please your name is required")
    .not()
    .isEmpty(),
    check("email", "Please use a Valid email").isEmail()
    .not()
    .isEmpty(),
    check("message", "Please  your comment is required")
    .not()
    .isEmpty(),
]