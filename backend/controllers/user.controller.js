const User = require("../models/user.model.js");

// Create and Save a new user
exports.create = (req, res) => {
    //validate request
    if (!req.body){
        res.status(400).send({
            message: "Content can't be empty"
        });
    }

    //create user
    const user = new User({
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        birthdate: req.body.birthdate,
        city: req.body.city,
        state: req.body.state,
        password: req.body.password
    });

    //save user into the database
    User.create(user, (err, data) => {
    if (err)
        res.status(500).send({
        message:
            err.message || "user creation error"
        });
    else res.send(data);
    });
};

// Find a single user by uid
exports.findOne = (req, res) => {
    User.findByUID(req.params.uid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `No user with ${req.params.uid}.`
            });
            } else {
            res.status(500).send({
                message: "Error retrieving User with id " + req.params.user
            });
            }
        } else res.send(data);
        });
};

// Update a user by uid in the request
/*
exports.update = (req, res) => {
  
};
*/

// Delete a user by uid in the request
exports.delete = (req, res) => {
    User.remove(req.params.uid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No user with id ${req.params.uid}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.uid
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
        });
};

