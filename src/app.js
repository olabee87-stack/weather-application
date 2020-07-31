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
