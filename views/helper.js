
const root = "http://localhost:3000";

const indexActionList = exports.indexActionList = (isLoggedIn, isMember, isModerator) => {
  let output = "";
  
  if (isLoggedIn) {
    output += "<h2>Actions</h2>";
    output += "<ul>";
    output += createActionLink("settings", "User settings");
  }

  if (isMember || isModerator) {
    output += createActionLink("createThread", "Create a new thread");
  }

  if (isModerator) {
    output += createActionLink("listUsers", "List all users");
  }

  if (isLoggedIn) {
    output += "</ul>";
  }

  return output;
}

function createActionLink(path, name) {
  return "<li><a href=\"/"+path+"\">"+name+"</a></li>";
}