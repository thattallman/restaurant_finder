const { Router } = require("express");
const router = Router();
const USER = require("../Models/user");
const { handleRegister, handleLogin } = require("../Controller/userAuth");

// for user registration 
router.post("/register", handleRegister);

// for user login 
router.post("/login", handleLogin);

module.exports = router;
