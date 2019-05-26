/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Renders user settings page.
 */

const User = require("../model/model").User;

exports.settings = (req, res) => {
  if (!req.session.username) {
    res.sendStatus(403);
    return;
  }

  let role = req.session.role;
  // Render the actions the user can do according to their permission level (role).
  let userLoggedIn = true, isUserMember = false, isUserMod = false, isAdmin = false;

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

  User.findOne({ username: req.session.username }, (err, user) => {
    let userId = user._id;
    let days_to_payment = user.days_to_payment;
    let email = user.email;
    let username = user.username;

    res.render("userSettings", {
      isAdmin,
      isUserMember,
      isUserMod,
      userLoggedIn,
      userId,
      days_to_payment,
      email,
      username,
      script: "../public/front_settings.js"
    });
  });
}