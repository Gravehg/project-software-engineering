const express = require("express");
const { getAssignedTickets } = require("../controllers/supportController");
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

module.exports = router;
