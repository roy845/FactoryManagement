const express = require("express");

const router = express.Router();

const {
  addEmployeeController,
  getAllEmployeesController,
  getAllManagersController,
  getEmployeeController,
  updateEmployeeController,
  getAllAvailableEmployeesForShift,
  deleteEmployee,
  addEmployeeToShift,
} = require("../controllers/employeeController");
const { requireSignIn } = require("../middlewares/authMiddleware");

//CREATE EMPLOYEE
router.post("/addEmployee", requireSignIn, addEmployeeController);
//GET ALL EMPLOYEES
router.get("/getAllEmployees", requireSignIn, getAllEmployeesController);
//GET EMPLOYEE
router.get("/getEmployee/:id", requireSignIn, getEmployeeController);
//UPDATE EMPLOYEE
router.put("/updateEmployee/:id", requireSignIn, updateEmployeeController);
//GET ALL MANAGERS
router.get("/getAllManagers", requireSignIn, getAllManagersController);
//GET ALL AVAILABLE EMPLOYEES TO A SHIFT
router.get(
  "/getAllAvailableEmployeesForShift/:shiftID",
  requireSignIn,
  getAllAvailableEmployeesForShift
);
//DELETE EMPLOYEE
router.delete("/deleteEmployee/:employeeID", requireSignIn, deleteEmployee);
//ADD EMPLOYEE TO SHIFT
router.post(
  "/addEmployeeToShift/:employeeID/:shiftID",
  requireSignIn,
  addEmployeeToShift
);

module.exports = router;
