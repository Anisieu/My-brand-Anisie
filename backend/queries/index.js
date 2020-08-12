const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const expresSession = require("express-session");
const schema=require("schema");

const PORT= 6000;
// app.post('/signup', signUpvalidator, (req,res)=>res.send('A @hapi/joi validations'));

app.use(express)
app.use(schema)
app.use(bodyParser.json())
app.use(expressValidator())
app.use(expresSession({secret:'max', saveUninitialized:false, resave:false} ))
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

