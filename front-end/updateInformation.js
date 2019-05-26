/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Handle REST API PUT-request to /users/id from the handlebars front-end.
 */
const userController = require("../controllers/userController");
const User = require("../model/model").User;

exports.updateInformation = (req, res) => {
  if (!req.session.username) {
    res.sendStatus(403);
    return;
  }

  if (!req.body || !req.body.id) {
    console.log("req body", req.body)
    res.sendStatus(400);
    return;
  }

  if (req.body.permission_level ||
    (req.body.days_to_payment && !req.session.role in ["mod", "admin"])) {
    res.sendStatus(403);
    return;
  }

  User.findById(req.body.id, (err, user) => {
    if (user.username !== req.session.username) {
      res.sendStatus(403);
      return;
    }

    req.params.id = req.body.id;
    delete req.body.id;
    userController.update(req, res);
  });
}