

const jwt = require("jsonwebtoken");
const User = require("../model/model").User;
const bcrypt = require("bcryptjs");

// /login route handler. Logs the user in if username 
// and password match and are in the database.
const login = exports.login = (req, res, next) => {
  // Load user credentials.
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

      // Prepare JWT token and send it.
      let payload = {
        permission_level: user.permission_level
      };

      jwt.sign(payload, "verySecretKey", {expiresIn: "30m"}, (err, token) => {
        if (err) {
          res.sendStatus(500);
          console.error(err);
          return;
        }

        res.json({ token });
      });
    });
  });
}