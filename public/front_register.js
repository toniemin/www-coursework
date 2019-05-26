/**
 * WWW Programming 2019 - Coursework - Discussion forum.
 * 
 * Front-end script file for the register page.
 * Allows the user to create a new user to the system using the registration form.
 */

const url = "http://localhost:3000";

// Parse and send the registration form to the server.
function sendData() {
  // Get data from the form.
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("confirm_password").value;

  // Validate password.
  if (password !== confirm_password) {
    output.style.color = "red";
    output.textContent = "Password and confirm password do not match";
    console.log("password", password, "conf", confirm_password);
    return;
  }

  // Construct request body.
  let data = {
    username,
    email,
    password
  };

  fetch(url + "/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).
    catch((err) => {
      console.log(err);
      output.style.color = "red";
      output.textContent = "Registration failed";
    }).
    then(function (response) {
      if (response.ok) {
        // Forward user back to the main page.
        setTimeout(function () {
          window.location.href = url;
        }, 1000);

        output.style.color = "green";
        output.textContent = "Registration succesful";
      }
      else {
        output.style.color = "red";
        output.textContent = "Registration failed";
      }
    });
}

window.onload = function () {
  let form = document.getElementById("register_form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    sendData();
  });
}