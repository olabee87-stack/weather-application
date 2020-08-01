console.log("Client side js file");

const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  //Setting the contents of the paragraphs created
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  //Get the search value (location) and display the data
  //If error, dsplay in <p1>. If none, display location in <p1> and forecast in <p2>
  fetch("http://localhost:3005/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          //console.log(data.error);
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
