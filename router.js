/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for the hbs template engine.
 */


const router = require("express").Router();
const controller = require("./controllers/postController");

router.get('/posts', controller.index).
  post('/posts', controller.create).
  get('/posts/:id', controller.show).
  put('/posts/:id', controller.update).
  delete('/posts/:id', controller.destroy);

  