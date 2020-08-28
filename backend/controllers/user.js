const User = require("../model/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.login = async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;
        let user = await User.findOne({
            email
        });
        if (!user){
            return res.status(400).json({
                message: "User Not Exist"
            });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({
                message: "Incorrect Password !"
            });
        };
        try{
            const token = await jwt.sign(
                {user: user},
                "secret",
                
            );
            return res.status(200).json({
                token
            });
            
            
        }
        catch(error){
            return res.status(400).json({
                message: error
                
            });

        }
};


