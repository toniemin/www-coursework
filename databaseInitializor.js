/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Code that runs only once. EVER.
 * Initializes the database by registering an admin user 
 * and adding the basic permission types.
 */
const http = require("http");
const fs = require("fs");

const { Permission, User, Action } = require("./model/model");

const hostname = "0.0.0.0";
const port = 3000;

const test = require("./user-control/actions").test;

http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Database initialization started!");

  console.log(`Initializing database. Please stand by...`);
}).
  listen(port, hostname, () => {
    console.log(`Loading permission list from file...`);

    // Load JSON file with the action objects.
    let rawData = fs.readFileSync("permissions_2.json", {encoding: "UTF-8"});
    let permissions = JSON.parse(rawData);

    console.log(`Creating permission lists...`);

    //console.log(`${JSON.stringify(permissions["unregistered_user_actions"])}`);

    //console.log(`What the actual fuck part 1: ${JSON.stringify(permissions)}`);

     createPermission(1, "unreg", JSON.parse(permissions["unregistered_user_actions"]));
//     createPermission(2, "unpaid", permissions["unpaid_member_actions"]);
//     createPermission(3, "member", permissions["member_actions"]);
//     createPermission(4, "mod", permissions["moderator_actions"]);
//     createPermission(5, "admin", permissions["administrator_actions"]);

//     console.log(`Permission lists created. Creating admin user...`);

//     // Fetch admin permissions.
//     Permission.findOne({ name: "admin" }, (err, permission) => {
//       if (err) console.error(err);

//       let admin = new User({
//         username: "admin",
//         permission_level: permission._id,
//         email: "admin@admin.com",
//         password: "12345678",
//         days_to_payment: 30
//       });

//       admin.save((err, admin) => {
//         if (err) console.error(err);

//         console.log(`Admin user created with credentials 
//       (username:password): admin:12345678. The database initializion has now finished.`);
//       });
//     });
  });

function createPermission(level, name, actions) {
  console.log(`WTF is wrong with my actions??? actions: ${actions}`)
  Action.insertMany(actions, (err, docs) => {
    if (err) {
      console.error(err);
    }
    let permission = new Permission({
      level: level,
      name: name,
      actions: docs
    });
    permission.save((err, permission) => {
      if (err) console.error(err);

      console.log(`Permission "${permission.name}" added to the database`);
    });
  });
}