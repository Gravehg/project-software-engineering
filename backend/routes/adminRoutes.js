const express = require("express");
const { getExistingUsers, getExistingSupports, createNewUserSupport, createNewSupportWithUser } = require("../controllers/adminController");
const { validateSession, validateUser } = require("../controllers/authController");
const router = express.Router();

module.exports = router;

router.get(
    "/get-existing-users/:email",
    validateSession,
    validateUser,
    getExistingUsers
);

router.get(
    "/get-existing-supports/:email",
    validateSession,
    validateUser,
    getExistingSupports
);

router.post(
    "/create-new-user-support",
    validateSession,
    validateUser,
    createNewUserSupport
);

router.post(
    "/create-new-support-with-user",
    validateSession,
    validateUser,
    createNewSupportWithUser
);