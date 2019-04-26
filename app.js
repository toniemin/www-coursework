const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hbs = require("express-hbs");

const hostname = "0.0.0.0";
const port = 3000;

const app = express();

app.engine("hbs", hbs.express4({
  partialsDir: __dirname + "/views/partials"
}));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.listen(port, hostname, () => {
  console.log("Server listening on " + hostname + ":" + port + "!");
});