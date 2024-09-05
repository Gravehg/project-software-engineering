const express = require("express");
const {
  login,
  magicLink,
  verifyToken,
  logOut,
} = require("../controllers/authController");
const router = express.Router();

router.get("/login/:token", login);
router.post("/magic-link", magicLink);
router.get("/is-logged", verifyToken);
router.get("/log-out", logOut);
module.exports = router;
