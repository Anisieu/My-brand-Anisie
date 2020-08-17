const express = require("express");
const bodyParser = require("body-parser");


const user = require("./routes/user");
const blog = require("./routes/blog");
const query = require("./routes/query");



const InitiateMongoServer = require("./config/db");



// Initiate Mongo Server
InitiateMongoServer();
require("./seeds/admin")
const app = express();

// PORT
const PORT = process.env.PORT || 7000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user);
app.use("/blog", blog);
app.use("/query", query);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
