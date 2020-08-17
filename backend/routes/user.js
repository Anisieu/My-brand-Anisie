const express = require("express");
const user = require("../controllers/user");
const uservar = require("../validator/user");
const bcrypt = require("bcryptjs");
const router = express.Router();
const auth = require("../middleware/auth");



router.post("/signup", uservar.signupvalidator, user.signup);
router.post("/login",uservar.signinvalidator, user.login);
router.get("/credintials",auth, user.getcredentials);
router.get("/",auth, user.getAll);

module.exports = router;
