const express = require("express");
const {
  getTicketById,
  updateClosureState,
  updateResolutionState
} = require("../controllers/ticketController");
const { addTicket } = require("../controllers/ticketController");
const router = express.Router();

const { validateSession } = require("../controllers/authController");

router.post("/add-ticket", validateSession, addTicket);
router.get("/getTicketById", getTicketById);
router.put("/updateClosureState", updateClosureState);
router.put("/updateResolutionState", updateResolutionState);

module.exports = router;
