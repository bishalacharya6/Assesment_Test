const express = require("express");
const router = express.Router();

const { AddCountry, GetCountries, AddCity, GetCities } = require("../controllers/countrycity");


router.get("/country", GetCountries)
router.post("/country", AddCountry)
router.get("/cities", GetCities)
router.post("/cities", AddCity)


module.exports = router; 
