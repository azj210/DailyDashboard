const { createUser, login, getUserbyUID, getUserbyEmail, getUsers, updateUserPass, updateUserInfo, deleteUserbyUID, authenticateUser } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

//pass in URL and controller
router.post("/", createUser);
//router.get("/", getUsers);
router.get("/", getUserbyEmail);
//if we get the id in the URL then we call the getUserbyUID controller
router.get("/:uid", checkToken, getUserbyUID);
router.delete("/:uid", checkToken, deleteUserbyUID);
router.post("/login", login);
router.patch("/", checkToken, updateUserPass);
router.patch("/info", checkToken, updateUserInfo);

//function chaining isn't working
router.post("/authenticate", checkToken, authenticateUser);

module.exports = router;