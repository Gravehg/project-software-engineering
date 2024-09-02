const express = require("express");
const {
    addTicket,
  
} = require("../controllers/ticketController");
const router = express.Router();

const {
    validateSession,
  } = require("../controllers/authController");

router.post("/add-ticket", validateSession, addTicket);

module.exports = router;
