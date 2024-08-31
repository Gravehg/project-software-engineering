const express = require("express");
const {
  getAllTickets,
  getAllCategories,
  getTicketPool,
} = require("../controllers/adminController");
const {
  validateSession,
  validateAdmin,
} = require("../controllers/authController");
const router = express.Router();

router.get(
  "/get-all-tickets",
  validateSession,
  validateAdmin,
  getAllTickets
);

router.get(
  "/get-all-categories",
  validateSession,
  validateAdmin,
  getAllCategories
);

router.get(
  "/get-pool-tickets",
  validateSession,
  validateAdmin,
  getTicketPool
);

module.exports = router;