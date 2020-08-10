const pool = require("../../config/database");
const { createDisplay, updateDisplay, getDisplayByUID, deleteDisplayByUID, updateDisplayByName } = require("./dashDisplay.service");


module.exports = {
    createDisplay: (req, res) => {
        const body = req.body;
        createDisplay(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "unable to create display"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    updateDisplay: (req, res) => {
        const body = req.body;
        updateDisplay(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "unable to update the display"
                })
            }
            console.log(results);
            return res.status(200).json({
                success: 1,
                message: "succesfully updated the display"
            })
        });
    },

    updateDisplayByName: (req, res) => {
        const body = req.body;
        updateDisplayByName(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "unable to update the display"
                })
            }
            console.log(results);
            return res.status(200).json({
                success: 1,
                message: "succesfully updated the display"
            })
        });
    },

    getDisplayByUID: (req, res) => {
        const uid = req.params.uid;
        getDisplayByUID(uid, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "error in retrieving user display"
                });
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
        })
    },

    deleteDisplayByUID: (req, res) => {
        const uid = req.params.uid;
        deleteDisplayByUID(uid, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "error in deleting display"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    }
}