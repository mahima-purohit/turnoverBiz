require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require('passport');


const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
const PORT = process.env.PORT || 8080;
const config = {
    endpoint: "http://localhost:8000/turnoverBiz"
}

//Middleware
app.use(express.json());

console.log('dburl ', process.env.DB_URL)
//connect tp MongoDB 
mongoose
    .connect(`${process.env.DB_URL}`)
    .then(() => console.log("Connected to DB at", process.env.DB_URL, "configEndopint is", config.endpoint))
    .catch((e) => console.log("Failed to connect to DB", e));

// Passport middleware
app.use(passport.initialize());

app.get("/turnoverBiz", (req, res) => {
    res.send("Hello from turnover");
})


app.use('/turnoverBiz', userRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = {
    config
}