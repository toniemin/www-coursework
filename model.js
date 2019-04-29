/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Model of the MVC-application. Uses mongoose with MongoDB.
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const hostname = "0.0.0.0" // IMPORT HOSTNAME
const port = 3000; // IMPORT PORT NUMBER

mongoose.connect(`mongodb://localhost/forums`, {useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Database connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const ObjectId = Schema.Types.ObjectId;

// Schema representing a discussion.
const threadSchema = new Schema({
  user: ObjectId,
  createdAt: Date,
  title: String,
  posts: [PostSchema]
});

const Thread = exports.ThreadModel = mongoose.model("Threads", threadSchema);

const postSchema = new Schema({
  user: ObjectId,
  createdAt: Date,
  title: String,
  content: String
});

const Post = exports.Post = mongoose.model("Posts", postSchema);

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

const User = exports.User = mongoose.model("Users", UserSchema);

const permissionSchema = new Schema({
  level: Number,
  actions: [String]
});

const Permission = exports.Permission = mongoose.model("Permissions", permissionSchema);