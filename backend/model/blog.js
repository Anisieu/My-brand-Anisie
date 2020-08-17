const mongoose = require("mongoose")

const blogschema = mongoose.Schema({
  date:Date,
  title: String,
  image_ulr: String,
  content: String
})

module.exports = mongoose.model("blog", blogschema)