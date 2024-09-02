const express = require("express");
const {getTicketById,updateClosureState} = require("../controllers/ticketController");
const router = express.Router();

router.get("/getTicketById", getTicketById);
router.put("/updateClosureState", updateClosureState);


module.exports = router;