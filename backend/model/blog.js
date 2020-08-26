const mongoose = require("mongoose")

const blogschema = mongoose.Schema({
  date: Date,
  title: String,
  image_ulr: String,
  content: String,
  like: Number
})

module.exports = mongoose.model("blog", blogschema)