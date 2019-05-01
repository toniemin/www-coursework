/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Database controller for posts.
 */
const Post = require("../model").Post;

exports.index = (req, res) => {
  Post.find({}, (err, post) => {
    if (err) res.send(err);

    res.json(post);
  });
}

exports.create = (req, res) => {
  const newPost = new Post(req.body);
  newPost.save((err, post) => {
    if (err) res.send(err);
    res.json(post);
  })
}

exports.show = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) res.send(err);
    res.json(post);
  });
}

exports.update = (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true}, (err, post) => {
    if (err) res.send(err);
    res.json(post);
  });
}

exports.destroy = (req, res) => {
  Post.deleteOne({ _id: req.params.id }, (err, post) => {
    if (err) res.send(err);
    res.json({ "message": `(${req.params.id}) was successfully deleted,`});
  });
}