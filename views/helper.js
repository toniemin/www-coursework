/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Helper functions for express-handlebars.
 */

const root = "http://localhost:3000";

// Renders a list of links leading to different actions the user can take.
// The list changes according to user's role.
const indexActionList = exports.indexActionList = (isLoggedIn, isMember, isModerator) => {
  let output = "";

  output += "<h2>Actions</h2>";
  output += "<ul>";
  output += createActionLink("", "Home");

  if (isLoggedIn) {
    output += createActionLink("settings", "User settings");
  }

  if (isModerator) {
    output += createActionLink("userList", "List all users");
  }

  output += "</ul>";

  return output;
}

// Helper function for creating list elements.
function createActionLink(path, name) {
  return "<li><a href=\"/" + path + "\">" + name + "</a></li>";
}