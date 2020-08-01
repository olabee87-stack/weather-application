const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up handle bars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Set up static html directory to serve(if HTML)
app.use(express.static(publicDirectoryPath));

//Client-side URL
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Olabisi Odusanya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Olabisi Odusanya",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Us",
    content: "If you have any questions, please contact me.",
    name: "Olabisi Odusanya",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("You must provide an address!");
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        } else {
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
        }
      });
    }
  );
});

app.get("/contact/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    missingPage: "Help article not found",
    name: "Olabisi Odusanya",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: " 404 Error",
    missingPage: "404! Page not found!",
    name: "Olabisi Odusanya",
  });
});

//Localhost port
app.listen(3005, () => {
  console.log("Server successfully started on port 3000");
});
