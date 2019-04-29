/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for the REST API.
 */

const router = require("express").Router();
const userController = require("./userController.js");
const postController;
/**
 * User
 * 
 */

router.post("/user", userController.

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