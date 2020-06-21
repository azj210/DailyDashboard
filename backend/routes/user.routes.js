module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new user
    router.post("/", users.create);

    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve a user with uid
    router.get("/:uid", users.findOne);

    // Update a user with uid
    //router.put("//:uid", users.update);

    // Delete a user by uid
    router.delete("/:uid", users.delete);

    app.use('/api/users', router);
};