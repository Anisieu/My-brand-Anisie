const express = require("express");

const blog = require("../controllers/blog");
const blogval = require("../validator/blog");

const comment = require("../controllers/comment");
const commentval = require("../validator/comment");

const auth = require("../middleware/auth");
const router = express.Router();

router.use(
    cors({
      origin: '*',
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }),
  );

router.post("/create",auth, blogval.blogvalidator, blog.create);
router.get("/all", blog.getAll);
router.get("/:id", blog.getOne);
router.patch("/:id",auth, blog.patch);
router.delete("/:id", auth, blog.delete);
router.put("/:id/like", blog.like);

router.post("/:blogId/comment", commentval.commentvalidator, comment.create);
router.get("/:blogId/comment", comment.getAll);

module.exports = router;