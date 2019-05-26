/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Handle the membership fee payment of the user.
 */
const User = require("../model/model").User;

exports.payFee = (req, res) => {
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

    let data = {
      days_to_payment: 30
    }

    if (user.username === req.session.username) {
      User.findByIdAndUpdate(id, data, (err, user) => {
        if (err) res.send(err);
        res.json(user);
      });
    }
  });
}