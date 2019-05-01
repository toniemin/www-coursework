/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Database controller for permissions.
 */

const Permission = require('../model').Permission;

exports.index = (req, res) => {
  Permission.find({}, (err, permission) => {
    if (err) res.send(err);

    res.json(permission);
  });
}

exports.create = (req, res) => {
  const newPermission = new Permission(req.body);
  newPermission.save((err, permission) => {
    if (err) res.send(err);
    res.json(permission);
  })
}

exports.show = (req, res) => {
  Permission.findById(req.params.id, (err, permission) => {
    if (err) res.send(err);
    res.json(permission);
  });
}

exports.update = (req, res) => {
  Permission.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true}, (err, permission) => {
    if (err) res.send(err);
    res.json(permission);
  });
}

exports.destroy = (req, res) => {
  Permission.deleteOne({ _id: req.params.id }, (err, permission) => {
    if (err) res.send(err);
    res.json({ "message": `(${req.params.id}) was successfully deleted,`});
  });
}