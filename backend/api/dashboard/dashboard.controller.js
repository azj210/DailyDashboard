const { createDash, updateDash, getDashbyUID, getData, deleteDashbyUID } = require("./dashboard.service");
const { checkToken } = require("../../auth/token_validation");
const https = require("https");
require('dotenv').config();

//controllers that handle all the services from dashboard.service.js
module.exports = {
    createDash: (req, res) => {
        const body = req.body;
        createDash(body, (err, results) => {
            if (err) {
                //return a response in the json format
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "database connection error"
                });
            }
            //we get results and send it to users
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    updateDash: (req, res) => {
        const body = req.body;
        updateDash(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "dashboard updated successfully"
            });
        });
    },

    getDashbyUID: (req, res) => {
        const body = req.body;
        //extract the id from the url
        const uid = req.params.uid;
        //pass the uid into the servce
        getDashbyUID(uid, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "user not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getData: (req, res) => {
        const body = req.body;
        //pass the data into the service
        getData(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results);
            if (!results) {
                return res.json({
                    success: 0,
                    message: "data not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    deleteDashbyUID: (req, res) => {
        const uid = req.params.uid;
        deleteDashbyUID(uid, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    //gets weather from an API based on the user's city
    getWeather: (req, res) => {
        const apiKey=process.env.WEATHER_KEY;
        const city=req.body.city;
        https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`, function(response) {
            response.on("data", function(data) {
                const weatherData = JSON.parse(data);
                return res.json(weatherData)
            });
        })
    }
};

