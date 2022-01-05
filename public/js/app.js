console.log("Javascript Loaded!");

const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");

const messageOne = document.querySelector("#message-1");

const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => { 
  e.preventDefault();
  messageTwo.textContent = "";
  messageOne.textContent = "Loading...";
  const address = searchLocation.value;
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.currentTemperature;
        messageTwo.textContent = data.location;
      }
      searchLocation.value = "";
    });
  });
});
