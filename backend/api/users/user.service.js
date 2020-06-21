const pool = require("../../config/database");

module.exports = {
    //receives data from the controller and receives a callBack function if code is successful
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
    }
};