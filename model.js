/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Model of the MVC-application. Uses mongoose with MongoDB.
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require('validator');

const hostname = "0.0.0.0" // IMPORT HOSTNAME
const port = 3000; // IMPORT PORT NUMBER

mongoose.connect(`mongodb://localhost/forums`, {useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Database connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema({
  user: {
    type: ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  title: {
    type: String,
    required: false,
    maxlength: 30
  },
  content: {
    type: String,
    required: true,
    minlength: 3,
    maxlenght: 2000
  }
});

const Post = exports.Post = mongoose.model("Posts", postSchema);


// Schema representing a discussion.
const threadSchema = new Schema({
  user: {
    type: ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  posts: {
    type: [ObjectId],
    required: false,
    default: null
  }
});

const Thread = exports.ThreadModel = mongoose.model("Threads", threadSchema);


// Schema representing a user in the system.
// 'role' is a reference to the RoleSchema 'id',
// 'days_to_payment' is a number describing days
// to user's next member fee payment
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  perm_lvl: {
    type: ObjectId,
    required: false,
    default: null
  },
  email: {
    type: String,
    required: true,
    validate: function() {
      return validator.isEmail(this.email);
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: function() {
      return validator.isAscii(this.password);
    }
  },
  days_to_payment: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 30
  }
});

const User = exports.User = mongoose.model("Users", UserSchema);

const permissionSchema = new Schema({
  level: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlenght: 20
  },
  actions: {
    type: [String],
    required: true,
    default: null
  }
});

const Permission = exports.Permission = mongoose.model("Permissions", permissionSchema);