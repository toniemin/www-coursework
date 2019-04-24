const UserModel = require("./model").UserModel;
const bcrypt = require("bcryptjs");

exports.getAll = (req, res) => {

};

exports.getOne = (req, res) => {

};

exports.insertOne = (req, res) => {
  let username;
  let password;
  let email;
  let role = "unpaid";
  let days_to_payment = 0;

  // Save password.
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash("sample", salt, (err, hash) => {
      // Store password in DB.
    });
  });
};

exports.deleteAll = (req, res) => {

};

exports.deleteOne = (req, res) => {

};

exports.putOne = (req, res) => {

};

exports.authenticate = (req, res) => {

};