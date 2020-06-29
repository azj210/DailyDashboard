const { createDash, updateDash, getDashbyUID, getSong } = require("./dashboard.service");
const { checkToken } = require("../../auth/token_validation");

//controllers that handle all the services from dashboard.service.js
module.exports = {
    createDash: (req, res) => {
        const body = req.body;

    },

    updateDash: (req, res) => {
        const body = req.body;

    },

    getDashbyUID: (req, res) => {
        const body = req.body;

    },

    getSong: (req, res) => {
        const body = req.body;

    }
};

