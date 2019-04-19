const mongoose = require('mongoose');
const { Schema } = mongoose;

const hostname = "0.0.0.0" // IMPORT HOSTNAME
const port = 3000; // IMPORT PORT NUMBER

mongoose.connect('mongodb://+'+hostname+':'+3000);

// Schema representing a user in the system.
// 'role' is a reference to the RoleSchema 'id',
// 'days_to_payment' is a number describing days
// to user's next member fee payment
const UserSchema = new Schema({
  id: Number,
  role: Number,
  name: String,
  username: String,
  password: String,
  phone: String,
  email: String,
  days_to_payment: Number
});

const RoleSchema = new Schema({
  id: Number,
  role: String,
  level: Number
});

const PermissionSchema = new Schema({
  id: Number,
  value: []
});

const User = mongoose.model('User', UserSchema);
const Role = mongoose.model('Role', RoleSchema);
const Permission = mongoose.model('Permission', PermissionSchema);