const Blog = require("../models/blog");




exports.getAll= async(req, res) => { 
    const blogs = await Blog.find();
    res.send(blogs);
};

exports.create = async(req, res) => {

    const { date,title,image_ulr, content } = req.body

    if(isNaN(Date.parse(date))){
        res.send("Invalid date")
    }
    else if(!(date && title && image_ulr && content)){
        res.send("All input fields are required")

    }
    else{
        const blog = new Blog({
            date: req.body.date,
            title: req.body.title,
            image_ulr : req.body.image_ulr,
            content: req.body.content
        });
        await blog.save();
        res.send(blog);
    }
};

exports.getOne = async(req, res) => { 
    try {
        const blog = await Blog.findOne({ _id: req.params.id });
        res.send(blog);
    } catch {
        res.status(404);
        res.send({ error: "Blog doesn't exist!" });
    }
};