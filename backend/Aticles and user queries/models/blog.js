const mongoose = require("mongoose")

const schema = mongoose.Schema({
  date:Date,
  title: String,
  image_ulr: String,
  content: String
})

module.exports = mongoose.model("blog", schema)