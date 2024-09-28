const express = require("express");
const {
  getAssignedTickets,
  getSupportCategories,
  getSupportTicketPool,
  assignTicket,
  getAllTickets,
} = require("../controllers/supportController");
const {
  validateSession,
  validateSupport,
  validateAdmin,
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

router.get("/get-all-tickets", validateSession, validateAdmin, getAllTickets);

router.post("/assign-ticket", validateSession, validateSupport, assignTicket);

module.exports = router;
