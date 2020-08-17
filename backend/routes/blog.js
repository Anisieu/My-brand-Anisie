const express = require("express");
const blog = require("../controllers/blog");
const blogval = require("../validator/blog");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/",auth, blogval.blogvalidator, blog.create);
router.get("/", blog.getAll);
router.get("/:id", blog.getOne);
router.patch("/:id",auth, blog.patch);
router.delete("/:id",auth, blog.delete);




module.exports = router;