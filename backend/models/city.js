const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    }
}, { timestamps: true });

const City = mongoose.model("City", CitySchema);
module.exports = City;
