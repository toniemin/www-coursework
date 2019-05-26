/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Front-end script file for the user settings page.
 * This page lets the user:
 * - delete themselves from the system
 * - pay for their membership
 * - change their email
 * - change their password
 */

const url = "http://localhost:3000";
const output = document.getElementById("output");
const userId = document.getElementById("userId").value;
let jwt = localStorage.getItem("access-token");

function main() {
  // Add an event handler to the delete button.
  document.getElementById("del-btn").onclick = (event) => {
    if (confirm("Do you really want to delete your account?")) {
      let data = {
        id: userId
      }

      // Delete user from the system.
      fetch(url + "/deleteAccount", {
        method: "post",
        headers: {
          "authorization": jwt,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).
        then((response) => {
          if (response.ok) {
            // Logout the user and forward them to the home page after deletion.
            setTimeout(function () {
              window.location.href = url + "/logout";
            }, 500);
            
            output.style.color = "green";
            output.textContent = "Account deleted."
          }
          else {
            output.style.color = "red";
            output.textContent = "Account deletetion failed."
          }
        }).
        catch(error => console.error("Error:", error)).
        then((data) => {
          console.log(data);
        });
    }
  }

  // Add an event handler to the pay button.
  document.getElementById("pay-btn").onclick = (event) => {
    if (confirm("Pay your membership fee of 1000€ with your very real credit card?")) {
      let data = {
        id: userId
      };
      
      // Send update to the server.
      fetch(url+"/payFee", {
        method: "POST",
        headers: {
          "authorization": jwt,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).
      then((response) => {
        if (response.ok) {
          updateAndRefresh("Membership payed.", true);
        }
        else
        {
          updateAndRefresh("Membership payment failed!", false);
        }
      });
    }
  }

  // Add event handler for the password change form.
  document.getElementById("passwd-form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    let password = document.getElementById("passwd").value;
    let conf_password = document.getElementById("conf_passwd").value;

    // Validate password.
    if (password !== conf_password) {
      updateAndRefresh("Password and confirm password do not match!", false);
      return;
    }

    // Form request body.
    let body = {
      id: userId,
      password
    };

    // Send request.
    sendUpdate(body);
  });

  // Event handler for the email change form.
  document.getElementById("email-form").addEventListener("submit", (event) => {
    event.preventDefault();

    let email = document.getElementById("email").value
    let conf_email = document.getElementById("conf_email").value;

    // Validate email.
    if (email !== conf_email) {
      updateAndRefresh("Emails do not match!", false);
      return;
    }

    // Form request body.
    let body = {
      id: userId,
      email
    }

    // Send request.
    sendUpdate(body);
  });
}
main();

// Send a fetch request updating user information described
// in the data parameter.
function sendUpdate(data) {
  fetch(url+"/updateInformation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).
  catch((err) => {
    console.log(err);
    updateAndRefresh("Update failed!", false);
  }).
  then((response) => {
    if (response.ok) {
      updateAndRefresh("Update successful.", true);
    }
    else {
      updateAndRefresh("Update failed!", false);
    }
  });
}

// Render information about user action and refresh the page.
function updateAndRefresh(text, result) {
  setTimeout(function () {
    window.location.reload();
  }, 1000);

  output.style.color = result ? "green" : "red";
  output.textContent = text;
}