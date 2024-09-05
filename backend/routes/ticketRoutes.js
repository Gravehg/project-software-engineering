const express = require("express");
const {
  getTicketById,
  updateClosureState,
  updateResolutionState,
  updateAssignedSupp,
  getSuppTicketById,
  updateCategory,
} = require("../controllers/ticketController");
const { addTicket } = require("../controllers/ticketController");
const router = express.Router();

const { validateSession } = require("../controllers/authController");

router.post("/add-ticket", validateSession, addTicket);
router.get("/getTicketById", getTicketById);
router.put("/updateClosureState", updateClosureState);
router.put("/updateResolutionState", updateResolutionState);
router.put("/updateAssignedSupp", updateAssignedSupp);
router.get("/getSuppTicketById", getSuppTicketById);
router.put("/updateCategory", updateCategory);

module.exports = router;
