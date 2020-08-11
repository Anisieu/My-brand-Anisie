const express = require("express")
const mongoose=require("mongoose")
const routes=require("./routes")


const app = express()
const PORT=400

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
  .then(() => {
    console.log("db created")

  })
  .catch((err)=>{
    console.log(err)
  })

app.listen(5000, () => {
  console.log("Server has started!",PORT)

})