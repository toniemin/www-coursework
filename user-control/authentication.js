

const jwt = require("jsonwebtoken");
const User = require("../model/model").User;
const Permission = require("../model/model").Permission;
const bcrypt = require("bcryptjs");
const { unregistered_user_actions, 
  unpaid_member_actions,
  member_actions,
  moderator_actions,
  administrator_actions} = require("./actions");


const verifyToken = exports.verifyToken = (req, res, next) => {
  let bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader === "undefined" || bearerheader === null) {
    res.sendStatus(403);
    return;
  }

  // Extract token from the header.
  let bearerToken = bearerHeader.split(" ")[1];
  
  jwt.verify(bearerToken, "verySecretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    // Get Permission associated with the user and the get the list
    // of allowed actions.
    Permission.findById(authData.permission_level._id, "actions", (err, permission) => {
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
      for (let action in actions) {
        if (action.path === req.path && action.verb === req.method) {
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
        res.locals.query = req.body;
        next();
      }

      
      let requestObject = req.body;
      for (key in Object.keys(requestObject)) {
        if (! allowed_attributes.includes(key)) {
          delete requestObject[key];
        }
      }

      res.locals.query = requestObject;
      next();
    });
  });
}

function verifyPermission(permission_level, path, method) {

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

  User.findOne({ username: username }, { lean: true }, (err, user) => {
    bcrypt.compare(password, user.password, (err, res) => {
      if (err || !res) {
        res.sendStatus(401);
        return;
      }

      let payload = {
        permission_level: user.permission_level
      };

      jwt.sign({payload}, "verySecretKey", (err, token) => {
        if (err) {
          res.sendStatus(500);
          return;
        }

        res.json({token});
      });
    });
  });
}