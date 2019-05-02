/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Main file of the application. This application implements a simple discussion forum site.
 * The site uses a simple REST API for all the data. The application uses the MongodDB,
 * Express, React (+ Redux) and Node framework stack. The app uses a html template engine as an 
 * option to React. The app uses MVC structure.
 */

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hbs = require("express-hbs");
const helmet = require('helmet');

// Routers for hbs web templates and the REST API.
const router = require("./routers/router");
const api_router = require("./routers/api_router.js");

const hostname = "0.0.0.0";
const port = 3000;

const app = express();

// Register helmet.
app.use(helmet());

// Register body-parser.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up template engine.
app.engine("hbs", hbs.express4({
  partialsDir: __dirname + "/views"
}));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// TODO: REGISTER AUTHENTICATOR MIDDLEWARE.

// REST API router.
app.use("/api", api_router);

app.listen(port, hostname, () => {
  console.log("Server listening on " + hostname + ":" + port + "!");
});
