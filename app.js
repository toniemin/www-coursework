/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Main file of the application. This application implements a simple discussion forum site.
 * The site uses a simple REST API for all the data. The app uses MVC structure.
 */

const express = require("express");
const helmet = require('helmet');

const bodyParser = require("body-parser");
const authenticator = require("./access-control/authentication").verifyToken;

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const db_connection = require("./model/model").db_connection;

const hbs = require("express-handlebars");


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
  secret: "sample text",
  store: new MongoStore( { mongooseConnection: db_connection }),
  resave: false,
  saveUninitialized: true
}));

// Set up template engine.
app.engine("handlebars", hbs({
  defaultLayout: "default"
}));
app.set("view engine", "handlebars");

app.use("/", router);

// Register authentication middleware.
app.use("/api", authenticator);

// REST API router.
app.use("/api", api_router);

app.listen(port, hostname, () => {
  console.log("Server listening on " + hostname + ":" + port + "!");
});
