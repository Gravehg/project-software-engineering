const express = require("express");
const {
  getAssignedTickets,
  getSupportCategories,
  getSupportTicketPool,
  assignTicket,
} = require("../controllers/supportController");
const {
  validateSession,
  validateSupport,
} = require("../controllers/authController");
const router = express.Router();

router.get(
  "/get-assigned-tickets",
  validateSession,
  validateSupport,
  getAssignedTickets
);

router.get(
  "/get-support-categories",
  validateSession,
  validateSupport,
  getSupportCategories
);

router.get(
  "/get-pool-tickets",
  validateSession,
  validateSupport,
  getSupportTicketPool
);

router.post("/assign-ticket", validateSession, validateSupport, assignTicket);

module.exports = router;
