const Population = require("../models/population");

async function PopulationData(req, res) {
    const body = req.body;
    console.log(body)
    if (
        !body || !body.country || !body.city || !body.population || !body.old || !body.young || !body.children
    ) {
        return res.status(404).json("All field are required...")
    }

    const result = await Population.create({
        country: body.country,
        city: body.city,
        population: body.population,
        old: body.old,
        young: body.young,
        children: body.children
    });

    return res.status(201).json({ msg: "Data Registered Successfully", id: result._id });
}

async function GetPopulation(req, res) {
    const allPopulation = await Population.find({})
    return res.json(allPopulation);
}

async function GetPopulationById(req, res) {
    const population = await Population.findById(req.params.id);
    if (!population) return res.status(404).json({ error: "Population Data not found" });
    return res.json(population);
}

async function GetPopulationByCountry(req, res) {
    try {
        const { country } = req.body;
        console.log(req.body);

        const data = await Population.find({ country });

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Population Data not found for the given country" });
        }

        return res.json(data);  
    } catch (error) {
        console.error("Error in GetPopulationByCountry:", error);
        return res.status(500).json({ error: "Internal Server Error" });  
    }
}




module.exports = { PopulationData, GetPopulation, GetPopulationById, GetPopulationByCountry, }