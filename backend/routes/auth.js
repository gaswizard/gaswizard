const express = require("express");
const authCtrl = require("../controller/auth/auth");
const VerifyToken = require("../middleware/VerifyToken");
const router = express.Router();


router.post("/check-user", authCtrl.checkUser);
router.post("/sign-up-user", authCtrl.signupUser);

module.exports = router;
