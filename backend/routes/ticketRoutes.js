const express = require("express");
const {getTicketById,updateClosureState} = require("../controllers/ticketController");
const {
    addTicket,
  
} = require("../controllers/ticketController");
const router = express.Router();

const {
    validateSession,
  } = require("../controllers/authController");

router.post("/add-ticket", validateSession, addTicket);



router.get("/getTicketById", getTicketById);
router.put("/updateClosureState", updateClosureState);


module.exports = router;
