const mongoose = require("mongoose")

const queryschema = mongoose.Schema({
  name: String,
  email: String,
  message: String
})

module.exports = mongoose.model("query", queryschema)
