const express = require("express");

const router = express.Router();

const {
  getShift,
  addShiftController,
  getAllShiftsController,
  updateShiftController,
  addEmployeeToShiftController,
  removeEmployeeFromShiftController,
} = require("../controllers/shiftController");
const { requireSignIn } = require("../middlewares/authMiddleware");

//CREATE SHIFT
router.post("/addShift", requireSignIn, addShiftController);
//UPDATE SHIFT
router.put(
  "/updateShift/:id/:employeeId",
  requireSignIn,
  updateShiftController
);
//GET SHIFT
router.get("/getShift/:id", requireSignIn, getShift);
//GET ALL SHIFTS
router.get("/getAllShifts", requireSignIn, getAllShiftsController);
//ADD EMPLOYEE TO SHIFT
router.post(
  "/addEmployeeToShift/:shiftID",
  requireSignIn,
  addEmployeeToShiftController
);
//REMOVE EMPLOYEE FROM SHIFT
router.post(
  "/removeEmployeeFromShift/:shiftID",
  requireSignIn,
  removeEmployeeFromShiftController
);

module.exports = router;
