const Comment = require("../model/comment");
const commentvar = require("../validator/comment");
const { check, validationResult } = require("express-validator");


exports.create = async(req, res) => {
    const errors = validationResult(req);
    const blogId = req.params.blogId;
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const comment = new Comment({
        blogId: blogId,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    await comment.save();
    res.send(comment);

};

exports.getAll = async(req, res) => {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blogId: blogId });
    res.send(comments);
};