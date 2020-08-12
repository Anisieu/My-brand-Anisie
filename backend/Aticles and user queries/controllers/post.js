const Post = require("../models/post");

exports.all = async(req, res) => {
    const posts = await Post.find();
    res.send(posts);
};

exports.create = async(req, res) => {
    const { title, content } = req.body
    if ( title && content){
        const post = new Post({
            title: req.body.title,
            content: req.body.content
        });
        await post.save();
        res.send(post);
    }
    else{
        res.send("Invalid input")
    }
};

exports.get = async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        res.send(post);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
};