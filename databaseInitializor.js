/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Code that runs only once. EVER.
 * Initializes the database by registering an admin user 
 * and adding the basic permission types.
 */

const Flag = require("../model").Flag;

exports.initializeDatabase = (req, res) => {
  Flag.findOne({name: "DATABASE_INITIALIZED"}, (err, flag) => {
    if (flag != null && flag.state) {
      res.send("The database is already initialized.");
      next();
    }

    let Permission = require("../model").Permission;
    let Action = require("../model").Action;
    let User = require("../model").User;

    // TODO: initialize actions, permissions and admin user.
  });
}