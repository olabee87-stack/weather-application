const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=faba48e7e13e71666986ce791e190d69&query=" +
    longitude +
    "," +
    latitude +
    "&units=m";

  //getting the data of the url with 'request' and displaying some of the contents (body)
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Internet connection error, please try again", undefined);
    } else if (body.error) {
      callback(
        "Incorrect search request, please try a correct search",
        undefined
      );
    } else {
      callback(
        undefined,
        `The weather is ${body.current.temperature} degree celsius, it feels like ${body.current.feelslike} degrees and it is ${body.current.weather_descriptions[0]}`
      );
    }
  });
};

module.exports = forecast;
