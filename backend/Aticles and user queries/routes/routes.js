const express = require("express");
const router = express.Router();
const post = require("../controllers/post");
const query = require("../controllers/query");

router.get("/posts", post.all);

router.post("/posts", post.create);

router.get("/posts/:id", post.get);

router.get("/queries", query.all);

router.post("/queries", query.create);

router.get("/queries/:id", query.get);


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