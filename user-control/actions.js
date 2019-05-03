/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Permission list of the REST API. This file contains all the actions
 * currently operable on the REST API (through http). The actions are
 * defined in model.js.
 * 
 * The exported arrays are for use of the authenticator middleware.
 */

const Action = require("../model/model").Action;


/*
 * Threads.
 *
 */
const readThreadBasic = {
  path: "/api/threads/",
  verb: "GET",
  // attributes: ["title"]
};

const readThread = {
  path: "/api/threads/",
  verb: "GET"
};

const createThread = {
  path: "/api/threads",
  verb: "POST"
};

/*
 * Posts.
 *
 */
const readPost = {
  path: "/api/posts",
  verb: "GET"
};

const createPost = {
  path: "/api/posts",
  verb: "POST"
};

const deletePost = {
  path: "/api/posts",
  verb: "DELETE"
};

/*
 * Users.
 *
 */
const readUserBasic = {
  path: "/api/users",
  verb: "GET",
  // attributes: ["username", "permission_level"]
};

const readUserMod = {
  path: "/api/users",
  verb: "GET",
  // attributes: ["email", "days_to_payment"]
}

const readUserAdmin = {
  path: "/api/users",
  verb: "GET",
  // attributes: ["password"]
};

const createUser = {
  path: "/api/users",
  verb: "POST",
  // attributes: ["username", "email", "password"]
};

const updateUserMod = {
  path: "/api/users",
  verb: "PUT",
  // attributes: ["days_to_payment"]
};

const updateUserAdmin = {
  path: "/api/users",
  verb: "PUT"
}

const deleteUser = {
  path: "/api/users",
  verb: "DELETE"
};
/*
* Permissions.
*
*/
const readPermission = {
  path: "/api/permissions",
  verb: "GET"
};


exports.unregistered_user_actions = [
  readPermission,
  readThreadBasic,
  createUser
];

exports.unpaid_member_actions = [
  readPermission,
  readThread,
  readPost,
  readUserBasic
];

exports.member_actions = 
exports.unpaid_member_actions.concat(
  [createThread, createPost]
);

exports.moderator_actions = [
  readPermission,
  readThread,
  createThread,
  readPost,
  createPost,
  deletePost,
  readUserMod,
  updateUserMod
];

exports.administator_actions = [
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