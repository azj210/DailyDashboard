const { create, getUserbyUID, getUsers, deleteUserbyUID } = require("./user.service");
const { genSaltSync, hashSync } = require("bcrypt");

//controllers that handle all the services from user.service.js
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        console.log(body.password);
        const salt = genSaltSync(10);
        //using the salt we can generate the hash encrypted password and store it in body.password
        body.password = hashSync(body.password, salt);

        //the second parameter is a function that takes either err or results
        create(body, (err, results) => {
            if (err) {
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

    getUsers: (req, res) => {
        getUsers((err, results) => {
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

    getUserbyUID: (req, res) => {
        //extract the id from the url
        const uid = req.params.uid;
        //pass the uid into the servce
        getUserbyUID(uid, (err, results) => {
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

    deleteUserbyUID: (req, res) => {
        const uid = req.params.uid;
        deleteUserbyUID(uid, (err, results) => {
            if (err) {
                console.loge(err);
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
    }
};




