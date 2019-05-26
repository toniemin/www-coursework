/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Handles account deletion from the handlebars pages.
 */

const User = require("../model/model").User;

exports.deleteAccount = (req, res) => {
  if (!req.body || typeof req.body === "undefined") {
    res.sendStatus(400);
    return;
  }

  let id = req.body.id;

  if (!req.session.username
    || typeof req.session.username === "undefined"
    || id === null || typeof id === "undefined") {
    res.redirect("/");
    return;
  }

  User.findById(id, (err, user) => {
    if (err || user === null) {
      res.sendStatus(403);
      return;
    }

    if (user.username === req.session.username) {
      User.findByIdAndDelete(id, (err, doc) => {
        if (doc === null) {
          res.sendStatus(404);
          return;
        }
        res.end("Success");
      });
    }
  });
}