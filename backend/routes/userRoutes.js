const express = require("express");
const {
  getAssignedTickets,
  getUserCategories,
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
  getAssignedTickets
);

router.get(
  "/get-jammer-categories",
  validateSession,
  validateUser,
  getUserCategories
);

module.exports = router;
