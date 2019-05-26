/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Router for all the script files for use in the front-end.
 */

const router = require("express").Router();
const path = require("path");

router.get("/front_register.js", (req, res) => {
  let filepath = path.join(__dirname, "..", "/public/front_register.js");
  res.sendFile(filepath);
});

router.get("/front_settings.js", (req, res) => {
  let filepath = path.join(__dirname, "..", "/public/front_settings.js");
  res.sendFile(filepath);
});

router.get("/front_userList.js", (req, res) => {
  let filepath = path.join(__dirname, "..", "/public/front_userList.js");
  res.sendFile(filepath);
});

router.get("/front_login.js", (req, res) => {
  let filepath = path.join(__dirname, "..", "/public/front_login.js");
  res.sendFile(filepath);
});

router.get("/front_index.js", (req, res) => {
  let filepath = path.join(__dirname, "..", "/public/front_index.js");
  res.sendFile(filepath);
});

module.exports = router;