/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Permission list of the REST API. This file contains all the actions
 * currently operable on the REST API (through http). The actions are
 * defined in model.js.
 * 
 * The exported arrays are for use of the authenticator middleware.
 */

const Action = require("../model").Action;

const unregistered_user_actions = exports.unregistered_user_actions = [
  readPermission,
  readThreadBasic,
  createUser
];

const unpaid_member_actions = exports.unpaid_member_actions = [
  readPermission,
  readThread,
  readPost,
  readUserBasic
];

const member_actions = exports.member_actions = 
unpaid_member_actions.concat(
  [createThread, createPost]
);

const moderator_actions = exports.moderator_actions = [
  readPermission,
  readThread,
  createThread,
  readPost,
  createPost,
  deletePost,
  readUserMod,
  updateUserMod
];

const administator_actions = exports.administator_actions = [
  readPermission,
  readThread,
  createThread,
  readPost,
  createPost,
  deletePost,
  readUserAdmin,
  updateUserAdmin,
  deleteUser
];

/*
 * Threads.
 *
 */
const readThreadBasic = new Action({
  path: "/api/threads/",
  verb: "GET",
  attributes: ["title"]
});

const readThread = new Action({
  path: "/api/threads/",
  verb: "GET"
});

const createThread = new Action({
  path: "/api/threads",
  verb: "POST"
});

/*
 * Posts.
 *
 */
const readPost = new Action({
  path: "/api/posts",
  verb: "GET"
});

const createPost = new Action({
  path: "/api/posts",
  verb: "POST"
});

const deletePost = new Action({
  path: "/api/posts",
  verb: "DELETE"
});

/*
 * Users.
 *
 */
const readUserBasic = new Action({
  path: "/api/users",
  verb: "GET",
  attributes: ["username", "permission_level"]
});

const readUserMod = new Action({
  path: "/api/users",
  verb: "GET",
  attributes: ["email", "days_to_payment"]
})

const readUserAdmin = new Action({
  path: "/api/users",
  verb: "GET",
  attributes: ["password"]
});

const createUser = new Action({
  path: "/api/users",
  verb: "POST",
  attributes: ["username", "email", "password"]
});

const updateUserMod = new Action({
  path: "/api/users",
  verb: "PUT",
  attributes: ["days_to_payment"]
});

const updateUserAdmin = new Action({
  path: "/api/users",
  verb: "PUT"
})

const deleteUser = new Action({
  path: "/api/users",
  verb: "DELETE"
});
/*
* Permissions.
*
*/
const readPermission = new Action({
  path: "/api/permissions",
  verb: "GET"
});

/*
* Actions.
*
*/