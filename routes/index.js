/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for the hbs template engine.
 */

const router = require("express").Router();
const path = require("path");

const loginController = require("../access-control/login").login;
const userController = require("../controllers/userController");
const Thread = require("../model/model").Thread;

router.get("/", (req, res) => {
  // Get all thread headlines from the database.
  Thread.find({}, (err, threads) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    if (typeof req.session.username === "undefined") {
      // User not logged in, display base page.
      res.render("index", {
        userLoggedIn: false,
        isUserMember: false,
        isUserMod: false,
        threads,
        script: "../public/front_index.js"
      });
      return;
    }

    // Render the actions the user can do according to their permission level (role).
    let userLoggedIn = true, isUserMember = false, isUserMod = false;
    let role = req.session.role;

    for (const value of ["member", "mod", "admin"]) {
      if (role === value) {
        isUserMember = true;
      }
    }

    for (const value of ["mod", "admin"]) {
      if (role === value) {
        isUserMod = true;
      }
    }

    res.render("index", {
      userLoggedIn,
      isUserMember,
      isUserMod,
      threads,
      script: "../public/front_index.js"
    });
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
