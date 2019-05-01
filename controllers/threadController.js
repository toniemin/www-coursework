/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Database controller for threads.
 */

const Thread = require('../model').Thread;

exports.index = (req, res) => {
  Thread.find({}, (err, thread) => {
    if (err) res.send(err);

    res.json(thread);
  });
}

exports.create = (req, res) => {
  const newThread = new Thread(req.body);
  newThread.save((err, thread) => {
    if (err) res.send(err);

    res.json(thread);
  });
}

exports.show = (req, res) => {
  Thread.findById(req.params.id, (err, thread) => {
    if (err) res.send(err);
    res.json(thread);
  });
}

exports.update = (req, res) => {
  Thread.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true}, (err, thread) => {
    if (err) res.send(err);
    res.json(thread);
  });
}

exports.destroy = (req, res) => {
  Thread.deleteOne({ _id: req.params.id }, (err, thread) => {
    if (err) res.send(err);
    res.json({ "message": `(${req.params.id}) was successfully deleted.`})
  });
}