const { create, getUserbyEmail, getUserbyUID, getUsers, updateUserPass, updateUserInfo, deleteUserbyUID } = require("./user.service");
const {checkToken} = require("../../auth/token_validation");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
//sign creates json tokens
const { sign } = require("jsonwebtoken");
const nodemailer = require('nodemailer');

//controllers that handle all the services from user.service.js
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        // console.log(body.password);
        const salt = genSaltSync(10);
        //using the salt we can generate the hash encrypted password and store it in body.password
        body.password = hashSync(body.password, salt);

        //the second parameter is a function that takes either err or results
        create(body, (err, results) => {
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

    //login controller
    login: (req, res) => {
        //user passes email and password, which will then be stored in body
        const body = req.body;
        //call the service. 2 params passed, the email and the callback
        getUserbyEmail(body.email, (err, results) => {
            //if you get an error then stop running
            if (err) {
                console.log(err);
            }
            //no error but result is blank
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                }); 
            }
            //valid email. take the result and compare input pass and pass associated with the email
            const result = compareSync(body.password, results.password);
            //matches
            if (result) {
                results.password = undefined;
                //generate a jsontoken qwe1234 that will be valid for 1 hour
                const jsontoken = sign({ result: results }, "qwe1234", { expiresIn: "1h" });
                return res.json({
                    success: 1,
                    message: "logged in successfully",
                    data: results,
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },

    sendForgotPasswordEmail: (req, res) => {
        const body = req.body;

        getUserbyEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "User Not Found"
                });
            }
            //valid email. send forgot password email to that email address
            const jsontoken = sign({ result: results }, "qwe1234", { expiresIn: "1h" });
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'daily.dashboard.webapp@gmail.com',
                    pass: process.env.REACT_APP_EMAIL_PASSWORD
                }
            })

            transporter.verify((error, success) => {
                if (error) {
                  console.log(error);
                  return;
                }
              });

            const mailOptions = {
                from: 'daily.dashboard.webapp@gmail.com',
                to: body.email,
                subject: 'Daily Dashboard Link to Reset Password',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          req.headers.origin + '/reset/' + jsontoken + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }

            transporter.sendMail(mailOptions, (err, data) => {
                if(err){
                    return res.json({
                        success: 0,                        
                        message: "Email Failed to Send"
                    })
                }
                else{
                    return res.json({
                        success: 1
                    })
                }
            })
        });
    },

    getUserbyEmail: (req, res) => {
        const body = req.body;

        getUserbyEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "User Not Found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    // basic authentication function to decide if a page should be rendered
    authenticateUser: (req, res) => {
        res.json({
            success: 1,
            message: "Valid Token"
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

    updateUserPass: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUserPass(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },

    updateUserInfo: (req, res) => {
        const body = req.body;
        updateUserInfo(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },

    deleteUserbyUID: (req, res) => {
        const uid = req.params.uid;
        deleteUserbyUID(uid, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
};




