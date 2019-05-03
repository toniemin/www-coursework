/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Database controller for users.
 */

const User = require("../model/model").User;
const bcrypt = require("bcryptjs");

exports.index = (req, res) => {
  User.find({}, res.locals.query,(err, users) => {
    if (err) res.send(err);

    res.json(users);
  });
}

// Insert a new user to the database.
exports.create = (req, res) => {
  if (req.body == null) {
    console.error(`Failed to add a user to the database. Request: ${req.body}`);
    res.end(req.body.err);
  }

  // Read request json.
  let username = res.locals.query.username;
  let email = req.locals.query.email;
  let password = req.locals.query.password;

  // Validate password length.
  if (password.length < 8 || password.length > 40) {
    res.end(`Failed to add a user to the database. Password length invalid.`);
  }

  // Encrypt the password.
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      // Create a new user. Save only password's hash.
      let user = new User({
        username: username,
        email: email,
        password: hash
      });

      console.log(`username: ${username}, email: ${email}, password: ${hash}`);

      // Save the user to the database.
      user.save((err, user) => {
        if (err) {
          console.error(`Failed to add user to the database: ${err}`);
          res.send(null);
        }
        
        console.log(`Added new user (${user}) to the database!`);
        res.json(user);
      });
    });
  });
}


exports.show = (req, res) => {
  User.findById(req.params.id, res.locals.query, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
}

exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, res.locals.query, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
}

exports.destroy = (req, res) => {
  User.deleteOne({_id: req.params.id }, (err, user) => {
    if (err) res.send(err);
    res.json({message: `User (${req.params.id}) was succesfully deleted.`});
  });
}