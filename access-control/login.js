/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Contains login function used by the front-end to let users log in to the system.
 * Sends the user a jsonwebtoken for REST API verification.
 */

const jwt = require("jsonwebtoken");
const User = require("../model/model").User;
const Permission = require("../model/model").Permission;
const bcrypt = require("bcryptjs");

// Let user log in with username and password.
const login = exports.login = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (typeof username === "undefined" || username === null || username === "") {
    // DENY LOGIN. FORWARD TO FAILED LOGIN PAGE.
    res.sendStatus(400);
    return;
  }

  if (password === "undefined" || password === null || password == "") {
    // DENY LOGIN. FORWARD TO FAILED LOGIN PAGE.
    res.sendStatus(400);
    return;
  }

  // Try to find the user from the database.
  User.findOne({ username: username }, (err, user) => {
    if (user === null) {
      res.sendStatus(400);
      return;
    }

    // User found. Compare password.
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        return;
      }
      if (!result) {
        res.sendStatus(401);
        console.error(err);
        return;
      }

      // Register session with username.
      req.session.username = username;

      // Find user's role and save it to session.
      Permission.findById(user.permission_level, (err, permission) => {
        if (err) throw err;

        req.session.role = permission.name;

        // Prepare jsonwebtoken and send it.
        let payload = {
          permission_level: user.permission_level
        };

        jwt.sign(payload, "verySecretKey", { expiresIn: "30m" }, (err, token) => {
          if (err) {
            res.sendStatus(500);
            console.error(err);
            return;
          }

          res.json({ token });
        });
      });
    });
  });
}