const express = require("express");
const router = express.Router();
const blog = require("../controllers/blog");
const query = require("../controllers/query");

router.get("/blogs", blog.getAll);

router.post("/blogs", blog.create);

router.get("/blogs/:id", blog.getOne);

router.get("/queries", query.getAll);

router.post("/queries", query.create);

router.get("/queries/:id", query.getOne);


// router.patch("/posts/:id", async (req, res) => {
//   try {
//     const post = await Post.findOne({ _id: req.params.id });

//     if (req.body.title) {
//       post.title = req.body.title;
//     }

//     if (req.body.content) {
//       post.content = req.body.content;
//     }

//     await post.save();
//     res.send(post);
//   } catch {
//     res.status(404);
//     res.send({ error: "Post doesn't exist!" });
//   }
// });

// router.delete("/posts/:id", async (req, res) => {
//   try {
//     await Post.deleteOne({ _id: req.params.id });
//     res.status(204).send();
//   } catch {
//     res.status(404);
//     res.send({ error: "Post doesn't exist!" });
//   }
// });

module.exports = router;