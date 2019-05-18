
function sendData() {
  // Reference to output on the state of the login.
  let output = document.getElementById("output");

  // Read data from the form fields.
  let formData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };

  // Create a POST request to the backend.
  fetch("http://localhost:3000/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "manual",
    body: JSON.stringify(formData)
  }).
  then(function (response) {
    if (response.ok) {
      // Disable submit button so no more requests can be sent.
      document.getElementById("submitbtn").disabled = true;

      // Read response.
      response.json().then(function (data) {
        // Save JWT access token to user's computer.
        localStorage.setItem("access_token", data["token"]);

        // Save the fact that user logged in to a cookie.
        // JWT expires in 30 mins and so will this cookie.
        document.cookie = "logged-in=true; max-age=1800";
  
        setTimeout(function() {
          window.location.href = "http://localhost:3000/";
        }, 1000);

        // Redirect user.
        output.style.color = "green";
        output.textContent = "Login succeeded! Redirecting...";
      });
    } else {
      output.textContent = "Login failed!";
    }
  }).catch(function (error) {
    console.log(error);
    output.textContent = "Login failed!";
  });
}
window.onload = function () {
  let form = document.getElementById("login_form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    sendData();
  });
}