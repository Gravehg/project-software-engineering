const express = require("express");
const {
  login,
  mobileLogin,
  magicLink,
  verifyToken,
  logOut,
  getLoginLink,
} = require("../controllers/authController");
const router = express.Router();

router.get("/login/:token", login);
router.post("/magic-link", magicLink);
router.get("/is-logged", verifyToken);
router.get("/log-out", logOut);
router.post("/mobileLogin", mobileLogin);

/*ATTENTION, THIS IS ONLY FOR NOW*/
if (process.env.TARGET == "DEV") {
  router.post("/get-login-link", getLoginLink);
}
module.exports = router;
