/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Code that runs only once. EVER.
 * Initializes the database by registering an admin user 
 * and adding the basic permission types.
 */
const http = require("http");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// Database manipulation. Bypass authentication.
const { Permission, User, Action } = require("./model/model");

const hostname = "0.0.0.0";
const port = 3000;

http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Database initialization started!");
}).
  listen(port, hostname, () => {
    console.log(`This script initializes permissions for the database, 
      and at the end adds an admin user to the database. 
      Please stand by...`);
    console.log(`Loading permission list from file...`);

    // Load JSON file.
    fs.readFile("permissions.json", { encoding: "UTF-8" }, (err, data) => {
      let permissions = JSON.parse(data);

      console.log(`Creating permission lists...`);

      createPermission(1, "unreg", permissions["unregistered_user_actions"]);
      createPermission(2, "unpaid", permissions["unpaid_member_actions"]);
      createPermission(3, "member", permissions["member_actions"]);
      createPermission(4, "mod", permissions["moderator_actions"]);

      // Create an admin user.
      let admin = {
        username: "admin",
        password: "12345678",
        email: "admin@admin.com",
        days_to_payment: 0
      };

      createPermission(5, "admin", permissions["administrator_actions"], admin);
    });
  });

// Give permissions to user
function createPermission(level, name, actions, user) {
  Action.insertMany(actions, (err, docs) => {
    if (err) {
      console.error(err);
    }
    let permission = new Permission({
      level: level,
      name: name,
      actions: docs
    });
    permission.save((err, permission) => {
      if (err) console.error(err);

      console.log(`Permission "${permission.name}" added to the database`);

      // Check if a user needs these permissions.
      if (typeof user === "undefined") {
        return;
      }
      console.log(`Permission lists created. Creating a new user...`);
      // Create a user and give them these permissions.
      // Hash the password.
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, (err, hash) => {
          let userModel = new User({
            username: user.username,
            password: hash,
            email: user.email,
            permission_level: permission._id,
            days_to_payment: user.days_to_payment
          });

          userModel.save((err, doc) => {
            if (err) console.error(err);

            // Print using original user object due to password getting encrypted.
            console.log(`User created: ${user.username}:${user.password}`);
          });
        });
      });
    });
  });
}