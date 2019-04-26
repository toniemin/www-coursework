/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for the hbs template engine.
 */

 const router = require("express").Router();

router.get("/", (req, res) => {
  res.redirect("/index");
});

router.get("/index", (req, res) => {
  res.render("index.hbs");
});

router.get("/login", (req, res) => {
  res.render("login.hbs");
});

router.get("/register", (req, res) => {
  res.render("register.hbs");
});

module.exports = router;