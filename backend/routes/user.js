const express = require("express");
const user = require("../controllers/user");
const uservar = require("../validator/user");
const bcrypt = require("bcryptjs");
const router = express.Router();
const auth = require("../middleware/auth");


router.post("/login",uservar.signinvalidator, user.login);

module.exports = router;
