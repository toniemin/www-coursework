/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for the hbs template engine.
 */

const router = require("express").Router();
const path = require("path");

const loginController = require("../access-control/authentication").login;
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login", {
    script: "http://localhost:3000/public/login.js"
  });
});

router.get("/public/login.js", (req, res) => {
  res.sendFile("/vagrant_data/public/login.js");
});

router.post("/login", loginController);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", userController.create);

module.exports = router;
