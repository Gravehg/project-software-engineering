const express = require("express");
const {
  getUserTickets,
  getUserCategories,
  comprobateTicketSupport,
  getUserTicketsMovil,
} = require("../controllers/userController");
const {
  validateSession,
  validateUser,
} = require("../controllers/authController");
const router = express.Router();

router.get(
  "/get-jammer-tickets",
  validateSession,
  validateUser,
  getUserTickets
);

router.get(
  "/get-jammer-categories",
  validateSession,
  validateUser,
  getUserCategories
);

router.get(
  "/comprobate-ticket-support/:ticketId",
  validateSession,
  validateUser,
  comprobateTicketSupport
);

router.get(
  "/get-jammer-tickets-movil/", 
  getUserTicketsMovil 
);

module.exports = router;
