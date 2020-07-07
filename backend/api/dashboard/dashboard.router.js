const { createDash, updateDash, getDashbyUID, getData, deleteDashbyUID, getWeather} = require("./dashboard.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

//pass in URL and controller
router.post("/create", createDash);
router.patch("/update", checkToken, updateDash);
router.get("/:uid", checkToken, getDashbyUID);
router.post("/", getData);
router.delete("/:uid", checkToken, deleteDashbyUID);
router.post("/get/weather", getWeather)

module.exports = router;