const Country = require("../models/country");
const City = require("../models/city")


// Add a country
async function AddCountry(req, res) {
    try {
        const { country } = req.body;

        if (!country) {
            return res.status(400).json({ message: 'Country name is required' });
        }

        const newCountry = new Country({ country });
        const savedCountry = await newCountry.save();

        res.status(201).json(savedCountry);
    } catch (error) {
        console.error('Error adding country:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get all countries
async function GetCountries(req, res) {
    try {
        const countries = await Country.find({}, 'country');
        res.status(200).json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Add a city
async function AddCity(req, res) {
    try {
        const { city } = req.body;

        if (!city) {
            return res.status(400).json({ message: 'City name is required' });
        }

        const newCity = new City({ city });
        const savedCity = await newCity.save();

        res.status(201).json(savedCity);
    } catch (error) {
        console.error('Error adding city:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get all cities
async function GetCities(req, res) {
    try {
        const cities = await City.find({}, 'city');
        res.status(200).json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { AddCountry, GetCountries, AddCity, GetCities };
