const express = require("express");

const router = express.Router();

const { getAllUsers, logAction } = require("../controllers/usersController");
const { requireSignIn } = require("../middlewares/authMiddleware");

//GET ALL
router.get("/getAllUsers", requireSignIn, getAllUsers);
//POST ACTION LOG
router.post("/logAction", requireSignIn, logAction);

module.exports = router;
