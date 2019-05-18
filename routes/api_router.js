/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for the REST API.
 */

const router = require("express").Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const threadController = require("../controllers/threadController");
const permissionController = require("../controllers/permissionController");
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
router.get('/threads', threadController.index).
  post('/threads', threadController.create).
  get('/threads/:id', threadController.show).
  put('/threads/:id', threadController.update).
  delete('/threads/:id', threadController.destroy);

/**
 * Permission
 * 
 */
router.get('/permissions', permissionController.index).
  post('/permissions', permissionController.create).
  get('/permissions/:id', permissionController.show).
  put('/permissions/:id', permissionController.update).
  delete('/permissions/:id', permissionController.destroy);

module.exports = router;