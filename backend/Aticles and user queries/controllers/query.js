const Query = require("../models/query");

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.getAll = async(req, res) => {
    const query = await Query.find();
    res.send(query);
};

exports.create = async(req, res) => {
    const {name, email, message } = req.body

    if (!isValidEmail(email)){
        res.send('invalid email');
    }
    else if (!(name && message &&  email)){
        res.send("All inputs are required")
    }
    else{
        const query = new Query({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        await query.save();
        res.send(query);
    }
  
};

exports.getOne = async(req, res) => {
    try {
        const query = await Query.findOne({ _id: req.params.id });
        res.send(query);
    } catch {
        res.status(404);
        res.send({ error: "Comment doesn't exist!" });
    }
};