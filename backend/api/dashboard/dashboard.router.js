const { createDash, updateDash, getDashbyUID, getData} = require("./dashboard.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

//pass in URL and controller
router.post("/create", checkToken, createDash);
router.patch("/update", checkToken, updateDash);
router.get("/:uid", checkToken, getDashbyUID);
router.get("/", getData);

module.exports = router;