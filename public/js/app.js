console.log("Javascript Loaded!");

let date = new Date();
let currDate = date.getDate();
let currMonth = date.toLocaleString("en-us", { month: "long" });
let year = date.getFullYear();

const weatherForm = document.querySelector("form");
const reportDiv = document.querySelector(".report");
const searchLocation = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const city = document.querySelector(".city");
const dated = document.querySelector(".date");
var iconImage = document.getElementById("image").src;
const description = document.querySelector(".description");
const temperature = document.querySelector(".tempFont");
const tempMax = document.querySelector(".maxTemp");
const tempMin = document.querySelector(".minTemp");
const feelsLike = document.querySelector(".feelsLike");
const humidity = document.querySelector(".humidity");
const err = document.querySelector("#error");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = searchLocation.value;
  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        err.style.display = "block";
        err.textContent = data.error;
      } else {
        err.style.display = "none";
        (description.textContent = data.description.toUpperCase()),
          (city.textContent = data.name),
          (dated.textContent = currMonth + " " + currDate + " , " + year),
          (temperature.textContent = data.temperature + "°"),
          (tempMax.textContent = data.maxTemp + "/" + data.minTemp + "°"),
          (feelsLike.textContent = "Feels like : " + data.feelsLike),
          (humidity.textContent = "Humidity :" + data.humidity),
          (document.getElementById(
            "image"
          ).src = `https://openweathermap.org/img/wn/50d@2x.png`);
        if (!reportDiv.style.display === "none") {
          reportDiv.style.display = "none";
        } else {
          reportDiv.style.display = "block";
        }
      }
      searchLocation.value = "";
    });
  });
});
