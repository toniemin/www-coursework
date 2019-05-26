/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Renders the user administration page of the application.
 */

const User = require("../model/model").User;

 // Render administration page of the website.
 // Redirect normal users. Display admin actions only for admins.
 exports.userList = (req, res) => {
  let role = req.session.role;

  // Redirect normal users.
  if (!role in ["mod", "admin"]) {
    res.redirect("/");
    return;
  }

  // Render the actions the user can do according to their permission level (role).
  let userLoggedIn = true, isUserMember = false, isUserMod = false;
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
  let isAdmin = (role === "admin");
  
  User.find({}, (err, users) => {
    res.render("userList", {
      isAdmin,
      isUserMember,
      isUserMod,
      userLoggedIn,
      users,
      script: "../public/front_userList.js"
    });
  });
}