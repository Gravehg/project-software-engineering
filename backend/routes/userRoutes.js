const express = require("express");
const {
  getUserTickets,
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
  getUserTickets
);

router.get(
  "/get-jammer-categories",
  validateSession,
  validateUser,
  getUserCategories
);

module.exports = router;
