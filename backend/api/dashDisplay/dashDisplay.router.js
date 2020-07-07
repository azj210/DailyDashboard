const { createDisplay, updateDisplay, getDisplayByUID, deleteDisplayByUID } = require("./dashDisplay.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

//pass in URL and controller
router.post("/create", createDisplay);
router.patch("/update", checkToken, updateDisplay);
router.get("/:uid", checkToken, getDisplayByUID);
router.delete("/:uid", checkToken, deleteDisplayByUID);

module.exports = router;