/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Defines the middleware the system uses for jsonwebtoken authentication.
 */

const Permission = require("../model/model").Permission;
const jwt = require("jsonwebtoken");

// Checks that the client supplied jsonwebtoken has the required
// permissions for the API call.
const verifyToken = exports.verifyToken = (req, res, next) => {
  // Index doesn't require authentication.
  if (req.path === "/") {
    next();
    return;
  }
  // Allow unregistered users to register to the system.
  if (req.path === "/users" && req.method === "POST") {
    next();
    return;
  }

  // Extract jsonwebtoken.
  let bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined" || bearerHeader === null) {
    res.sendStatus(403);
    console.error("Token undefined or missing.");
    return;
  }
  let bearerToken = bearerHeader.split(" ")[1];

  // Verify token.
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
      let currentPath = "/api"+req.path;
      for (let i = 0; i < actions.length; i++) {
        let action = actions[i];
        let correctPath = action.path;

        if (currentPath.includes(action.path) && action.verb === req.method) {
          allowed_attributes = action.attributes;
        }
      }

      // If the user cannot access any of the attributes, the user's
      // permissions do not allow them to access this object.
      if (allowed_attributes === null) {
        res.sendStatus(403);
        return;
      }

      // The user can access all of the attributes (admin priviledges).
      if (allowed_attributes[0] === "All") {
        next();
        return;
      }

      // Remove unallowed attributes from the request body.
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