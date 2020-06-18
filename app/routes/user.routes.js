module.exports = app => {
  const users = require("../controllers/user.controller.js");

  // Create a new user
  app.post("/users", users.create);

  // Retrieve a user with uid
  app.get("/users/:uid", users.findOne);

  // Update a user with customerId
  app.put("/users/:uid", users.update);

  // Delete a user by uid
  app.delete("/users/:uid", users.delete);
};