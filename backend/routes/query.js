const express = require("express");
const query = require("../controllers/query");
const queryval = require("../validator/query");
const auth = require("../middleware/auth");
const router = express.Router();


router.post("/create", auth, queryval.queryvalidator, query.create);
router.get("/all", query.getAll);
// router.patch("/:id",auth, query.patch);
// router.delete("/:id",auth, query.delete);


module.exports = router;