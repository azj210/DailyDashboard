const { createDash, updateDash, getDashbyUID, getSong } = require("./dashboard.service");
const { checkToken } = require("../../auth/token_validation");

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

    getSong: (req, res) => {
        const body = req.body;
        //pass the data into the servce
        getSong(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "song not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
};

