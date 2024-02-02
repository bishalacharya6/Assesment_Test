const mongoose = require("mongoose");

async function connectToMongodb (MongoURI) {
    try {
        mongoose.connect(MongoURI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log(`Database Not Connected ${error}`)
    }
}

module.exports = connectToMongodb;