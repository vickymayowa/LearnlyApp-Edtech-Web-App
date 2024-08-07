const express = require("express");
const { authUser, registerUser } = require("../controllers/userControllers.js");

const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);

module.exports = router;
