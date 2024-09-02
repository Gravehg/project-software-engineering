const express = require("express");
const {getMessages, getChatID} = require("../controllers/chatController");
const router = express.Router();

router.get("/getMessages", getMessages);
router.get("/getChatID", getChatID);

module.exports = router;
