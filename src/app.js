const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
