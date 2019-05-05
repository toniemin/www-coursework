/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for the hbs template engine.
 */

 const router = require("express").Router();

 router.get("/", (req, res, next) => {
  res.render("home", {
    layout: "default",
    template: "home-template"
  });
 });