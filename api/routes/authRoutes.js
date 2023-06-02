const express = require("express");

const router = express.Router();

const {
  loginController,
  getUserDashboardController,
} = require("../controllers/authController");
const { requireSignIn } = require("../middlewares/authMiddleware");

//LOGIN
router.post("/login", loginController);
//protected User route auth
router.get("/user-auth", requireSignIn, getUserDashboardController);

module.exports = router;
