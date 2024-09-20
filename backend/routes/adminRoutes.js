const express = require("express");
const { getUsers } = require("../controllers/adminController");
const {
  validateAdmin,
  validateSession,
  validateSupport,
} = require("../controllers/authController");

const router = express.Router();

//No se valida que sea supp, porque para este caso no se necesitan los datos del soporte para
//enviar los usuarios, con que sea admin basta.
router.get("/get-users", validateSession, validateAdmin, getUsers);

module.exports = router;
