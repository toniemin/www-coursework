/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Database controller for users.
 */

const UserModel = require("../model").User;
const bcrypt = require("bcryptjs");

// Get all of the users in the database.
exports.getAll = (req, res) => {

};

// Read one user from the database.
exports.getOne = (req, res) => {

};

// Insert a single user to the database.
exports.insertOne = (req, res) => {
  let username = req.body.name;
  let password = req.body.password;
  let email = req.body.email;

  // Save password.
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      let user = new User({
        username: username,
        password: hash,
        email: email,
        role: "unpaid",
        days_to_payment = 0
      });

      // Save the user to the database.
      user.save((err, user) => {
        if (err) return console.error(err);
        console.log("New user \'", username, "\' has been added to the database.");
      })
    });
  });
};

// Delete ALL users from the database.
exports.deleteAll = (req, res) => {

};

// Delete one user from the database.
exports.deleteOne = (req, res) => {

};

// Update one user in the database.
exports.putOne = (req, res) => {

};

exports.authenticate = (req, res) => {

};