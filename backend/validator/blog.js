const { check, validationResult } = require("express-validator/check");

exports.blogvalidator = [
    check("title", "Please use a Valid  title")
    .not()
    .isEmpty(),
    check("image_ulr", "Please use a Valid image ulr").isURL(),
    check("content", "Please  check your content")
]