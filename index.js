const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const user = require("./backend/routes/user");
const blog = require("./backend/routes/blog");
const query = require("./backend/routes/query");

const InitiateMongoServer = require("./backend/config/db");



// Initiate Mongo Server
InitiateMongoServer();
require("./backend/seeds/admin")
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// PORT
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user);
app.use("/blog", blog);
app.use("/query", query);
// app.use("/blog/:blogId/comment", comment);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

// export default app;
module.exports = app;