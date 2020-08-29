const Query = require("../model/query");
const { check, validationResult } = require("express-validator/check");


exports.getAll = async(req, res) => {
    const queries = await Query.find();
    res.send(queries);

};


exports.create = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const query = new Query({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    await query.save();
    res.send(query);

};

// exports.getOne = async(req, res) => {
//     try {
//         const query = await Query.findOne({ _id: req.params.id });
//         res.send(query);
//     } catch {
//         res.status(404);
//         res.send({ error: "Query doesn't exist!" });
//     }
// };

// exports.patch = async(req, res) => {
//     if (req.user.admin == true) {
//         try {
//             const query = await Query.findOne({ _id: req.params.id });

//             if (req.body.name) {
//                 query.name = req.body.name;
//             }

//             if (req.body.email) {
//                 query.email = req.body.email;
//             }
//             if (req.body.message) {
//                 query.message = req.body.message;
//             }
//             await query.save();
//             res.send(query);
//         } catch {
//             res.status(404);
//             res.send({ error: "query doesn't exist!" });
//         }
//     } else {
//         //res.json(user);
//         res.json("Unauthorised access")
//     }
// };

// exports.delete = async(req, res) => {
//     if (req.user.admin == true) {

//         try {
//             await Query.deleteOne({ _id: req.params.id });
//             res.status(204).send('Deleted');
//         } catch {
//             res.status(404);
//             res.send({ error: "Query doesn't exist!" });
//         }
//     } else {
//         //res.json(user);
//         res.json("Unauthorised access")
//     }
// };