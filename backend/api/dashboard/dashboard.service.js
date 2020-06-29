const pool = require("../../config/database");

module.exports = {
    //receives data from the controller and receives a callBack function if code is successful
    //updates the user's dashboard
    createDash: (data, callBack) => {
        pool.query(
            `insert into dashb(event, eventName, cocktailPref, songEnergy, songDecade, lastUpdate) 
                    values(?,?,?,?,?,?)`,
            [
                data.event,
                data.eventName,
                data.cocktailPref,
                data.songEnergy,
                data.songDecade,
                data.lastUpdate,
            ],
            //if we get a results then error is null
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //otherwise we don't have an error
                return callBack(null, results);
            }
        );
    },

    updateDash: (data, callBack) => {
        pool.query(
            `update dashb set (event, eventName, cocktailPref, songEnergy, songDecade, lastUpdate) 
                    values(?,?,?,?,?,?,?) where uid = ?`,
            [
                data.event,
                data.eventName,
                data.cocktailPref,
                data.songEnergy,
                data.songDecade,
                data.lastUpdate,
            ],
            //if we get a results then error is null
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //otherwise we don't have an error
                return callBack(null, results);
            }
        );
    }
};