const { createUser, login, getUserbyUID, getUsers, updateUserPass, deleteUserbyUID, authenticateUser } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

//pass in URL and controller
router.post("/", createUser);
router.get("/", getUsers);
//if we get the id in the URL then we call the getUserbyUID controller
router.get("/:uid", getUserbyUID);
router.delete("/:uid", deleteUserbyUID);
router.post("/login", login);
router.patch("/", checkToken, updateUserPass);

//function chaining isn't working
router.post("/authenticate", /*checkToken,*/ authenticateUser);

module.exports = router;