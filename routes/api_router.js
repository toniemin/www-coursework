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
router.get('/thread', threadController.index).
  post('/thread', threadController.create).
  get('/thread/:id', threadController.show).
  put('/thread/:id', threadController.update).
  delete('/thread/:id', threadController.destroy);

/**
 * Permission
 * 
 */
router.get('/permission', permissionController.index).
  post('/permission', permissionController.create).
  get('/permission/:id', permissionController.show).
  put('/permission/:id', permissionController.update).
  delete('/permission/:id', permissionController.destroy);

module.exports = router;