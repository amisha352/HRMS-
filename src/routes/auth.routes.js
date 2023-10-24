const express = require("express");
const { authController } = require("../api/controllers");
const { authToken } = require("../middlewares/authorization");
const router = new express();

router.post("/sign-up", authController.signUp);
router.post("/log-in", authController.logIn);
router.post("/change-password", authToken, authController.changePassword);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authToken, authController.resetPass);

module.exports = router;
