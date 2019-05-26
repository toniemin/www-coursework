/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Front-end script file for the user administration page.
 * The page allows admins and moderators to:
 * - ban users (no real use in this version)
 * - delete users (admin only)
 * - change user permissions (admin only)
 */

const url = "http://localhost:3000"
let jwt = localStorage.getItem("access-token");
let permissions;
const output = document.getElementById("output");

function main() {
  // Load all permissions from the database and 
  // save them to the permissions variable.
  // Also decyphers the permission ids to permission names on the page.
  fetch(url + "/api/permissions", {
    method: "GET",
    headers: {
      "authorization": jwt
    }
  }).
    then(response => response.json()).
    catch(error => console.error("Error:", error)).
    then((data) => {
      permissions = data;

      // Convert all "role" cells in the HTML table to render
      // the actual name of the permission instead of it's id.
      let roleCells = document.getElementsByClassName("role");
      for (let i = 0; i < roleCells.length; i++) {
        let roleId = roleCells[i].innerHTML;

        for (let u in permissions) {
          if (roleId === permissions[u]._id) {
            roleCells[i].innerHTML = permissions[u].name;
          }
        }
      }
    });

    // Add event listeners to all user row forms in the HTML table on the page.
    let forms = document.forms;
    for (let i=0; i < forms.length; i++) {
      let form = forms[i];
      let elements = form.elements;
      elements[1].addEventListener("click", banUser);
      if (elements.length >= 3) {
        // Admin only.
        elements[2].addEventListener("click", deleteUser);
        elements[3].addEventListener("change", changeUserRole);
      }
    }
}
main();

// Gets user's id from the parent (form) of the node (a button in the form).
function getUserId(node) {
  return node.parentNode.id;
}

// Event handler. Ban an user from the system (no significance in the current system).
function banUser(event) {
  // Form request body.
  let body = {
    days_to_payment: 0
  }

  // Get user's id to be banned.
  let id = getUserId(event.target);

  // Send request.
  fetch(url+"/api/users/"+id, {
    method: "PUT",
    headers: {
      "authorization": jwt,
      "Content-Type": "application/json",
      body: JSON.stringify(body)
    }
  }).
  then((response) => {
    if (response.ok) {
      updateStateAndRefresh("User " + id + " banned.", true);
    }
    else {
      updateStateAndRefresh("User " + id + " not banned!", false);
    }
  });
}

// Event handler. Send a delete request to the REST API to delete a user from the system.
function deleteUser(event) {
  let id = getUserId(event.target);
  fetch(url+"/api/users/"+id, {
    method: "DELETE",
    headers: {
      "authorization": jwt
    }
  }).
  then((response) => {
    if (response.ok) {
      updateStateAndRefresh("User " + id + " has been deleted.", true);
    }
    else {
      updateStateAndRefresh("User " + id + " not deleted!", false);
    }
  });
}

// Event handler. Change a user's role by sending a PUT request to the REST API.
function changeUserRole(event) {
  console.log("select fired");
  let role = event.target.value;
  console.log("role", role);

  let id = getUserId(event.target);

  let body;
  for (let i = 0; i < permissions.length; i++) {
    if (role === permissions[i].name) {
      body = {
        permission_level: permissions[i]._id
      }
    }
  }

  fetch(url+"/api/users/"+id, {
    method: "PUT",
    headers: {
      "authorization": jwt,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).
  then((response) => {
    if (response.ok) {
      updateStateAndRefresh("User " + id + " role has been changed.", true);
    }
    else {
      updateStateAndRefresh("User " + id + " role not changed!", false);
    }
  });
}

// Render output on user actions.
function updateStateAndRefresh(text, result) {
  setTimeout(() => {
    window.location.reload();
  }, 1000);

  output.style.color = result ? "green" : "red";
  output.textContent = text;
}