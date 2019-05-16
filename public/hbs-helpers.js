
const hbs = require("handlebars");
const Handlebars = hbs();

Handlebars.registerHelper("userLoggedIn", function (cookie) {
  let cookie = readCookie("logged-in");
  return cookie !== null;
});