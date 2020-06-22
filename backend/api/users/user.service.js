const pool = require("../../config/database");

module.exports = {
    //receives data from the controller and receives a callBack function if code is successful
    //creates a new user
    create: (data, callBack) => {
        pool.query(
            `insert into users(email, fName, lName, birthdate, city, state, password) 
                    values(?,?,?,?,?,?,?)`,
            [
                data.email,
                data.fName,
                data.lName,
                data.birthdate,
                data.city,
                data.state,
                data.password
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

    //retrieves all users 
    getUsers: callBack => {
        pool.query(
            `select uid, email, fName, lName, birthdate, city, state from users`,
            [],
            //callback
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    //retrieves a user by uid
    getUserbyUID: (uid, callBack) => {
        pool.query(
            `select uid, email, fName, lName, birthdate, city, state, password from users where uid = ?`,
            [uid],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                //results is an array format so we only need 1 result (the user)
                return callBack(null, results[0]);
            }
        );
    },

    //delete user by uid
    deleteUserbyUID: (uid, callBack) => {
        pool.query(
            `delete from users where uid= ?`,
            [uid],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};