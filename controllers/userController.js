/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Database controller for users.
 */

const User = require("../model/model").User;
const Permission = require("../model/model").Permission;
const bcrypt = require("bcryptjs");

// Return all users in the database.
exports.index = (req, res) => {
  User.find({}, req.body, (err, users) => {
    if (err) {
      console.error(err);
      res.send(err);
    }

    res.json(users);
  });
}

// Insert a new user to the database.
exports.create = (req, res) => {
  if (req.body == null) {
    console.error(`Failed to add a user to the database. Request: ${req.body}`);
    res.sendStatus(400);
    res.end(req.body.err);
    return;
  }

  // Read request json.
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  // Validate password length.
  if (password.length < 8 || password.length > 40) {
    res.end(`Failed to add a user to the database. Password length invalid.`);
    return;
  }

  // Encrypt the password.
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      res.sendStatus(500);
      console.error(err);
      return;
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        return;
      }

      // Find the default permission object.
      Permission.findOne({ name: "unpaid" }, (err, data) => {
        // Create a new user. Save only password's hash.
        let user = new User({
          username: username,
          email: email,
          password: hash,
          permission_level: data._id
        });

        // Save the user to the database.
        user.save((err, user) => {
          if (err) {
            console.error(`Failed to add user to the database: ${err}`);
            res.sendStatus(500);
            res.send(null);
            return;
          }

          console.log(`Added new user (${user.username}) to the database!`);
          res.json(user);
        });
      });
    });
  });
}

// Return a single user from the database.
exports.show = (req, res) => {
  User.findById(req.params.id, req.body, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
}

// Update one user.
exports.update = (req, res) => {
  if (!req.body.password) {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  }
  else {
    // Password being updated. Encrypt.
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        return;
      }

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          res.sendStatus(500);
          console.error(err);
          return;
        }
        req.body.password = hash;

        User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
          if (err) res.send(err);
          res.json(user);
        });
      });
    });
  }
}

// Delete one user.
exports.destroy = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, user) => {
    if (err) res.send(err);
    res.json({ message: `User (${req.params.id}) was succesfully deleted.` });
  });
}