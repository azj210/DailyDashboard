const { createDash, updateDash } = require("./dashboard.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

//pass in URL and controller
router.post("/create", checkToken, createDash);
router.post("/update", checkToken, updateDash);

module.exports = router;