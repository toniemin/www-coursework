/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for the hbs template engine.
 */

const router = require("express").Router();
const path = require("path");
const jwt = require("jsonwebtoken");

const loginController = require("../access-control/login").login;
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  let userLoggedIn = true;
  if (typeof req.session.username === "undefined") {
    // User not logged in, display base page.
    userLoggedIn = false;
  }
  res.render("index", {
    userLoggedIn,
    isUserMember: false,
    isUserMod: false,
    script: "../public/front_index.js"
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    script: "../public/front_login.js"
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.negotiate(err);
    }

    res.redirect("/");
  });
});

router.get("/public/front_login.js", (req, res) => {
  let filepath = path.join(__dirname, "..", "/public/front_login.js");
  res.sendFile(filepath);
});

router.get("/public/front_index.js", (req, res) => {
  let filepath = path.join(__dirname, "..", "/public/front_index.js");
  res.sendFile(filepath);
});

router.post("/login", loginController);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", userController.create);

module.exports = router;
