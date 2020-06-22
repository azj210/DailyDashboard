const { createUser, login, getUserbyUID, getUsers, deleteUserbyUID } = require("./user.controller");
const router = require("express").Router();

//pass in URL and controller
router.post("/", createUser);
router.get("/", getUsers);
//if we get the id in the URL then we call the getUserbyUID controller
router.get("/:uid", getUserbyUID);
router.delete("/:uid", deleteUserbyUID);
router.post("/login", login);

module.exports = router;