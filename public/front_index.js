
const root = "http://localhost:3000";

function threadHeadlines(threadsOutput) {
  // Get JWT from local storage.
  let token = localStorage.getItem("access-token");
  
  // Query all threads from rest api.
  fetch(root+"/api/threads", {
    method: "GET",
    headers: {
      "authorization": token
    }
  }).
  then(response => response.JSON()).
  catch(error => console.error("Error:", error)).
  then((data) => {
    console.log(data);
  });
}

window.onload = function (event) {
  let threadsOutput = document.getElementById("threadsOutput");

  threadHeadlines(threadsOutput);
}

function main() {
  
}
main();