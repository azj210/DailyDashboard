const { createUser, login, getUserbyUID, getUsers, deleteUserbyUID, authenticateUser } = require("./user.controller");
const checkToken = require("../../auth/token_validation")
const router = require("express").Router();

//pass in URL and controller
router.post("/", createUser);
router.get("/", getUsers);
//if we get the id in the URL then we call the getUserbyUID controller
router.get("/:uid", getUserbyUID);
router.delete("/:uid", deleteUserbyUID);
router.post("/login", login);

//function chaining isn't working
router.post("/authenticate", /*checkToken,*/ authenticateUser);

module.exports = router;