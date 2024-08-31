const express = require("express");
const {
    addTicket,
  
} = require("../controllers/ticketController");
const router = express.Router();


router.post("/add-ticket", addTicket);

module.exports = router;
