const express = require("express");
const { getExistingUsers, getExistingSupports, createNewUserSupport, createNewSupportWithUser,getUsers } = require("../controllers/adminController");
const {
  validateAdmin,
  validateSession,
  validateSupport,
  validateUser
} = require("../controllers/authController");

const router = express.Router();

//No se valida que sea supp, porque para este caso no se necesitan los datos del soporte para
//enviar los usuarios, con que sea admin basta.
router.get("/get-users", validateSession, validateAdmin, getUsers);

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