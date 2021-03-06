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

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(`mongodb://localhost/forums`, {useNewUrlParser: true});

const db = exports.db_connection = mongoose.connection;

db.on("error", console.error.bind(console, "Database connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const ObjectId = Schema.Types.ObjectId;

// Schema representing a discussion comment.
const postSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
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
    ref: "User",
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

const Thread = exports.Thread = mongoose.model("Threads", threadSchema);

/*
 * Schema representing a user in the system.
 * 'role' is a reference to the PermissionSchema 'id',
 * 'days_to_payment' is a number describing days
 * to user's next member fee payment.
 */
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  permission_level: {
    type: ObjectId,
    ref: "Permission",
    required: false,
    default: function() {
      Permission.findOne({name: "unpaid"}, (err, doc) => {
        if (err || doc == null) {
          return null;
        }
        return doc._id;
      });
    }
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
    minlength: 8
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

/*
 * Schema representing a REST API action.
 * Consists of the path to the API call,
 * the allowed verb to the API call,
 * and the attributes the API call can
 * see/edit.
 */
const actionSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  verb: {
    type: String,
    required: true,
    uppercase: true
  },
  attributes: {
    type: [String],
    default: ["All"],
    required: false
  }
});

const Action = exports.Action = mongoose.model("Actions", actionSchema);

/*
 * Schema representing a permission/role.
 * Each user has one permission object that defines
 * their role and what they can do (to the REST API).
 * What the user can do is defined with an array of
 * actions objects (see above).
 */
const permissionSchema = new Schema({
  level: {
    type: Number,
    required: true,
    max: 5,
    min: 1
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlenght: 20
  },
  actions: {
    type: [actionSchema],
    required: true,
    default: null
  }
});

const Permission = exports.Permission = mongoose.model("Permissions", permissionSchema);
