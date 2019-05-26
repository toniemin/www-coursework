/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Renders the main page of the website.
 */

const Thread = require("../model/model").Thread;

// Render main page and display all the discussion threads found in the database.
exports.index = (req, res) => {
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
}