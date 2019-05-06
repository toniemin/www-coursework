

const jwt = require("jsonwebtoken");
const User = require("../model/model").User;
const Permission = require("../model/model").Permission;
const bcrypt = require("bcryptjs");


const verifyToken = exports.verifyToken = (req, res, next) => {
  if (req.path === "/") next();

  let bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader === "undefined" || bearerHeader === null) {
    res.sendStatus(403);
    return;
  }

  // Extract token from the header.
  let bearerToken = bearerHeader.split(" ")[1];

  jwt.verify(bearerToken, "verySecretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
      console.error(err);
      return;
    }

    // Get Permission associated with the user and the get the list
    // of allowed actions.
    Permission.findById(authData.permission_level, "actions", (err, permission) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      if (permission === null || typeof permission.actions === "undefined") {
        res.sendStatus(500);
        return;
      }

      // Go through the allowed actions array in the permission object.
      // The allowed_attributes saves the object attributes the
      // user can access.
      let actions = permission.actions;
      let allowed_attributes = null;
      for (let i=0; i < actions.length; i++) {
        let action = actions[i];
        if (action.path === "/api"+req.path && action.verb === req.method) {
          allowed_attributes = action.attributes;
        }
      }

      // If the user cannot access any of the attributes, the user's
      // permissions do not allow them to access this object.
      if (allowed_attributes === null) {
        res.sendStatus(403);
        return;
      }

      // The user can access all of the attributes.
      if (allowed_attributes[0] === "All") {
        next();
        return;
      }

      let requestObject = req.body;
      for (key in Object.keys(requestObject)) {
        if (!allowed_attributes.includes(key)) {
          delete requestObject[key];
        }
      }

      req.body = requestObject;
      next();
    });
  });
}

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

  console.log(`Username: ${username}`)
  User.findOne({ username: username }, (err, user) => {
    if (user === null) {
      res.sendStatus(400);
      return;
    }

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