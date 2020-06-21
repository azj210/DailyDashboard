const db = require("../models/db.js");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
    //validate request
    if (!req.body){
        res.status(400).send({
            message: "Content can't be empty"
        });
        return;
    }

    //create user
    const user = {
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        birthdate: req.body.birthdate,
        city: req.body.city,
        state: req.body.state,
        password: req.body.password
    };

    //Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Find a single user by uid
exports.findOne = (req, res) => {
    const uid = req.params.uid;

    User.findByPk(uid)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with uid=" + uid
            });
        });
};

//Finds all users
exports.findAll = (req, res) => {
    User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

// Update a User by uid in the request
exports.update = (req, res) => {
    const uid = req.params.uid;
  
    User.update(req.body, {
        where: { uid: uid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${uid}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with uid=" + uid
            });
        });
};

// Delete a User with the specified uid in the request
exports.delete = (req, res) => {
    const uid = req.params.uid;
  
    User.destroy({
        where: { uid: uid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with uid=${uid}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with uid=" + uid
            });
        });
  };
