const Blog = require("../model/blog");
const blogvar = require("../validator/blog");
const { check, validationResult } = require("express-validator/check");

exports.create = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    
    if (req.user.admin == true) {
        const blog = new Blog({
            date: new Date(),
            title: req.body.title,
            image_ulr: req.body.image_ulr,
            content: req.body.content
        });
        await blog.save();
        res.send(blog);
    }
   else {
        //res.json(user);
        res.json("Unauthorised access")
    }

};

exports.getAll = async(req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);

};

exports.getOne = async(req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        if(blog){
            res.send(blog);
        }else{
            res.status(404);
            res.send({ error: "Blog doesn't exist!" });
        }
    } catch {
        res.status(500);
        res.send({ error: "Internal Error!" });
    }
};


exports.patch = async(req, res) => {
    if (req.user.admin == true) {
        try {
            const blog = await Blog.findOne({ _id: req.params.id });

            if (req.body.date) {
                blog.date = req.body.date;
            }

            if (req.body.title) {
                blog.title = req.body.title;
            }
            if (req.body.image_ulr) {
                blog.image_ulr = req.body.image_ulr;
            }

            if (req.body.content) {
                blog.content = req.body.content;
            }

            await blog.save();
            res.send(blog);
        } catch {
            res.status(404);
            res.send({ error: "blog doesn't exist!" });
        }
    } else {
        //res.json(user);
        res.json("Unauthorised access")
    }
};

exports.delete = async(req, res) => {
    if (req.user.admin == true) {

        try {
            await Blog.deleteOne({ _id: req.params.id });
            res.status(204).send('Deleted');
        } catch {
            res.status(404);
            res.send({ error: "blog doesn't exist!" });
        }
    } else {
        //res.json(user);
        res.json("Unauthorised access")
    }
};