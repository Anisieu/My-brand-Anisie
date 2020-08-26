const mongoose = require("mongoose")

const commentschema = mongoose.Schema({
  blogId: String,
  name: String,
  email: String,
  message: String
})

module.exports = mongoose.model("comment", commentschema )