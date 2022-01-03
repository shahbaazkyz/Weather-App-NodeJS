const request = require("request");

const weatherCode = (lat , lon, callback) => {
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a1a36875d10fc7c4646740447a2926d0&units=metric`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (response.body.error) {
      callback(response.body.error);
    } else {
      callback(undefined, {
        currentTemperature: response.body.main.temp,
      });
    }
  });
};

module.exports = weatherCode
