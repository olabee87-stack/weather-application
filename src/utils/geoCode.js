const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmVlODciLCJhIjoiY2s5cnd0Mzl2MDRiNDNkcGM2c3M2aGIwaiJ9.rVfjFBfZRfHw5887N0iRnA&limit=1";
  //destructured line 9 and passed the 'body' property of 'response' from the line 4 'url' directly into it
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the internet service", undefined);
    } else if (body.features.length === 0) {
      callback("Wrong search parameter, please try another search", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
      });
    }
  });
};

module.exports = geoCode;
