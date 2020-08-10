const pool = require("../../config/database");

module.exports = {
    //receives data from the controller and receives a callBack function if code is successful
    //create the user's display table
    createDisplay: (data, callback) => {
        pool.query(
            `insert into display(uid, cName, sName, mName, fName, lastUpdate) 
                    values(?,?,?,?,?,?)`,
            [
                data.uid,
                data.cName,
                data.sName,
                data.mName,
                data.fName,
                data.lastUpdate,
            ],

            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    // frontend updates the display based on user preferences if the current day is at least a day after lastUpdate
    // or a field is null and the user just input some preferences
    updateDisplay: (data, callback) => {
        pool.query(
            `update display set cName = ?, sName = ?, mName = ?, fName = ?, lastUpdate = ? where uid = ?`,
            [
                data.cName,
                data.sName,
                data.mName,
                data.fName,
                data.lastUpdate,
                data.uid,
            ],

            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    // updates the display based on category name passed in
    updateDisplayByName: (data, callback) => {
        pool.query(
            `update display set ${data.abbreivatedName} = ?, lastUpdate = ? where uid = ?`,
            [
                data.item,
                data.lastUpdate,
                data.uid,
            ],

            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getDisplayByUID: (uid, callback) => {
        pool.query(
            `select * from display where uid = ?`,
            [uid],

            (error, results) => {
                if (error) {
                    return callback(error);
                }
                //results is an array format so we only need 1 result (the user's dashboard)
                return callback(null, results[0]);
            }
        )
    },

    deleteDisplayByUID: (uid, callback) => {
        pool.query(
            `delete from display where uid= ?`,
            [uid],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    }
}