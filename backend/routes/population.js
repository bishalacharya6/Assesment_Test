const express = require("express");
const router = express.Router();

const { PopulationData, GetPopulation, GetPopulationById, GetPopulationByCountry } = require("../controllers/population")

router.route("/").get(GetPopulation).post(PopulationData)

router.route("/:id").get(GetPopulationById)

router.route("/countryname").get(GetPopulationByCountry)


module.exports = router;        