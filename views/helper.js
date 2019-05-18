
const root = "http://localhost:3000";

const indexActionList = exports.indexActionList = (isLoggedIn, isMember, isModerator) => {
  let output = "";
  
  if (isLoggedIn) {
    output += "<h2>Actions</h2>";
  }

  output += "<ul>";

  if (isLoggedIn) {
    output += createActionLink("settings", "User settings");
  }

  if (isMember) {
    output += createActionLink("createThread", "Create a new thread");
  }

  if (isModerator) {
    output += createActionLink("listUsers", "List all users");
  }

  return output;
}

function createActionLink(path, name) {
  return "<li><a href=\"/"+path+"settings\">"+name+"</a></li>";
}