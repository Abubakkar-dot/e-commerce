const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout } = require("../controllers/authController")
const validate = require("../middlewares/validate");
const userValidationSchema = require("../validations/userValidation");
const loginValidationSchema = require("../validations/loginValidation");


router.post("/register", validate(userValidationSchema), registerUser);
router.post("/login", validate(loginValidationSchema), loginUser);
router.get("/logout", logout);
module.exports = router;

