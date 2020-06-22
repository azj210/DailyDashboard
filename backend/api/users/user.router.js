const { createUser, getUserbyUID, getUsers, deleteUserbyUID } = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
//if we get the id in the URL then we call the getUserbyUID controller
router.get("/:uid", getUserbyUID);
router.delete("/:uid", deleteUserbyUID);

module.exports = router;