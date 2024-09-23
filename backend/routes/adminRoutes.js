const express = require("express");
const { getExistingUsers, getExistingSupports } = require("../controllers/adminController");
const { validateSession, validateUser } = require("../controllers/authController");
const router = express.Router();

module.exports = router;

router.get(
    "/get-existing-users",
    validateSession,
    validateUser,
    getExistingUsers
);

router.get(
    "/get-existing-supports",
    validateSession,
    validateUser,
    getExistingSupports
);