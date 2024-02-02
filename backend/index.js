const express = require("express");
const connectToMongodb = require("./db.js");
const UserRouter = require("./routes/users.js")
const PopulationRouter = require("./routes/population.js")
const CountryCity = require("./routes/countrycity.js")
const cors = require('cors');


const fs = require("fs");


const app = express();
app.use(express.json())
app.use(cors())
const port = 8000;  


//Database connection 
connectToMongodb("mongodb://localhost:27017/candidates");

//Middleware
app.use(express.urlencoded({ extended: false }));

//REST API Routes
app.use("/api/users", UserRouter);
app.use("/api/population", PopulationRouter);  
app.use("/api", CountryCity);   


app.listen(port, () => {
    console.log(
        `Server Started at ${port}`
    )
});