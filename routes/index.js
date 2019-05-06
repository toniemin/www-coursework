/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for the hbs template engine.
 */

const router = require("express").Router();

const loginController = require("../access-control/authentication").login;
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.render("index", {
    userLoggedIn: false,
    actions: null,
    headlines: null
  });
});

router.get("/login", (req, res) => {
  res.render("login");
})

router.post("/login", loginController);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", userController.create);

module.exports = router;