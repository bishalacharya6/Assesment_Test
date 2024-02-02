const mongoose = require("mongoose");

const PopulationSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    population: {
        type: Number, 
        required: true,
    },
    old: {
        type: Number,  
        required: true
    },
    young: {
        type: Number,  
        required: true
    },
    children: {
        type: Number,  
        required: true
    }
}, { timestamps: true });

const Population = mongoose.model("Population", PopulationSchema);
module.exports = Population;
