const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const user = require("./backend/routes/user");
const blog = require("./backend/routes/blog");
const query = require("./backend/routes/query");

const InitiateMongoServer = require("./backend/config/db");

const cors = require('cors')

 



// Initiate Mongo Server
InitiateMongoServer();
require("./backend/seeds/admin")
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use((req, res, next) => { res.header('Access-Control-Allow-Origin', '*'); res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept', ); next(); }); 
app.use(    cors({    origin: "*",    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",    preflightContinue: false,    optionsSuccessStatus: 204,    })       );

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