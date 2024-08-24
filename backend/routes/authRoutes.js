const express = require("express");
const {
  login,
  magicLink,
  verifyToken,
} = require("../controllers/authController");
const router = express.Router();

router.post("/login/:token", login);
router.post("/magic-link", magicLink);
module.exports = router;