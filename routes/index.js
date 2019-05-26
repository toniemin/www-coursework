/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router mainly for the handlebars front-end but also routes
 * login/logout functionality.
 */

const router = require("express").Router();

const loginController = require("../access-control/login").login;
const userController = require("../controllers/userController");

const index = require("../front-end/index").index;
const userList = require("../front-end/userList").userList;
const payFee = require("../front-end/payFee").payFee;
const deleteAccount = require("../front-end/deleteAccount").deleteAccount;
const updateInformation = require("../front-end/updateInformation").updateInformation;
const settings = require("../front-end/settings").settings;

// Handle membership fee payment from the handlebars website.
router.post("/payFee", payFee);

// Handle account deletion from the handlebars website.
router.post("/deleteAccount", deleteAccount);

// Renders the main page of the website.
router.get("/", index);

// Render the login page of the website.
router.get("/login", (req, res) => {
  if (req.session.username) {
    res.redirect("/");
  }

  res.render("login", {
    script: "../public/front_login.js"
  });
});

// Handle user logout.
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.negotiate(err);
    }

    res.redirect("/");
  });
});

// Renders the user administration page of the website.
router.get("/userList", userList);

// Handle PUT requests to /api/users for the handlebars website.
router.post("/updateInformation", updateInformation);

// Render the user settings page.
router.get("/settings", settings);

// Handle user login request.
router.post("/login", loginController);

// Render registration page for the handlebars website.
router.get("/register", (req, res) => {
  if (req.session.username) {
    res.redirect("/");
  }

  res.render("register", {
    script: "../public/front_register.js"
  });
});

// Handle creation of a new user from the handlebars website.
router.post("/register", userController.create);

module.exports = router;
