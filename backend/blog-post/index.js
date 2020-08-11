const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");

const app = express();
const PORT= 6000;

app.use(bodyParser.json())
app.use(routes)

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
  .then(() => {
    console.log("db created")


  })
  .catch((err)=>{
    console.log(err)
  })

  app.listen(PORT, () => {
    console.log("Server has started!");
});

