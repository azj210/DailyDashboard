const { create } = require("./user.service");
const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        console.log(body.password);
        const salt = genSaltSync(10);
        //using the salt you can generate the hash encrypted password and store it in body.password
        body.password = hashSync(body.password, salt);

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
    }

};




