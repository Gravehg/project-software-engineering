const express = require("express");
const {
  getAssignedTickets,
  getSupportCategories,
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

module.exports = router;
