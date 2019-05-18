/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Main file of the application. This application implements a simple discussion forum site.
 * The site uses a simple REST API for all the data. The app uses MVC structure.
 */

const express = require("express");
const helmet = require('helmet');

const bodyParser = require("body-parser");
const tokenVerifier = require("./access-control/tokenMiddleware").verifyToken;

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const db_connection = require("./model/model").db_connection;

const exhbs = require("express-handlebars");

const indexActionList = require("./views/helper").indexActionList;


// Routers for hbs web templates and the REST API.
const router = require("./routes/index");
const api_router = require("./routes/api_router");

const hostname = "0.0.0.0";
const port = 3000;

const app = express();

// Register helmet.
app.use(helmet());

// Register body-parser.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Register session handler.
app.use(session({
  secret: "sampleText",
  store: new MongoStore( { mongooseConnection: db_connection }),
  resave: false,
  saveUninitialized: true
}));

// Set up template engine.
const hbs = exhbs.create({
  defaultLayout: "default",
  helpers: {
    indexActionList
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use("/", router);

// Register authentication middleware.
app.use("/api", tokenVerifier);

// REST API router.
app.use("/api", api_router);

app.listen(port, hostname, () => {
  console.log("Server listening on " + hostname + ":" + port + "!");
});
