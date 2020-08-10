const { createDisplay, updateDisplay, getDisplayByUID, deleteDisplayByUID, updateDisplayByName } = require("./dashDisplay.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

//pass in URL and controller
router.post("/create", createDisplay);
router.patch("/update", checkToken, updateDisplay);
router.patch("/update-specific", checkToken, updateDisplayByName)
router.get("/:uid", checkToken, getDisplayByUID);
router.delete("/:uid", checkToken, deleteDisplayByUID);

module.exports = router;