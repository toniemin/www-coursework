/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for the REST API.
 */

const router = require("express").Router();
const userController = require("./controllers/userController.js");
const postController = require("./controllers/postController");
/**
 * User
 * 
 */
router.get('/users', userController.index).
  post('/users', userController.create).
  get('/users/:id', userController.show).
  put('/users/:id', userController.update).
  delete('/users/:id', userController.destroy);

/**
 * Post
 * 
 */
router.get('/posts', postController.index).
  post('/posts', postController.create).
  get('/posts/:id', postController.show).
  put('/posts/:id', postController.update).
  delete('/posts/:id', postController.destroy);


/**
 * Thread
 * 
 */
router.post("/thread", (req, res) => {

});

/**
 * Permission
 * 
 */
router.post("/permission", (req, res) => {

});

module.exports = router;