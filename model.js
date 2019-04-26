const mongoose = require("mongoose");
const { Schema } = mongoose;

const hostname = "0.0.0.0" // IMPORT HOSTNAME
const port = 3000; // IMPORT PORT NUMBER

mongoose.connect("mongodb://+"+hostname+":"+3000);

const ObjectId = Schema.Types.ObjectId;

// Schema representing a discussion.
const threadSchema = new Schema({
  user: ObjectId,
  date: Date,
  headline: String,
  posts: [PostSchema]
});

const ThreadModel = exports.ThreadModel = mongoose.model("Threads", threadSchema);

const postSchema = new Schema({
  user: ObjectId,
  date: Date,
  headline: String,
  content: String
});

const PostModel = exports.PostModel = mongoose.model("Posts", postSchema);

// Schema representing a user in the system.
// 'role' is a reference to the RoleSchema 'id',
// 'days_to_payment' is a number describing days
// to user's next member fee payment
const UserSchema = new Schema({
  username: String,
  password: String,
  perm_lvl: ObjectId,
  email: String,
  days_to_payment: Number
});

const UserModel = exports.UserModel = mongoose.model("Users", UserSchema);

const permissionSchema = new Schema({
  level: Number,
  actions: [String]
});

const PermissionModel = exports.PermissionModel = mongoose.model("Permissions", permissionSchema);