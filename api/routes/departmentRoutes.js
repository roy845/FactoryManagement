const express = require("express");

const router = express.Router();

const {
  addDepartmentController,
  getAllDepartmentsController,
  getDepartmentController,
  updateDepartmentController,
  addEmployeeToDepartmentController,
  deleteDepartmentController,
} = require("../controllers/departmentController");
const { requireSignIn } = require("../middlewares/authMiddleware");

//CREATE DEPARTMENT
router.post("/addDepartment", requireSignIn, addDepartmentController);
//GET ALL DEPARTMENTS
router.get("/getAllDepartments", requireSignIn, getAllDepartmentsController);
//GET DEPARTMENT
router.get("/getDepartment/:id", requireSignIn, getDepartmentController);
//UPDATE DEPARTMENT
router.put("/updateDepartment/:id", requireSignIn, updateDepartmentController);
//ADD EMPLOYEE TO DEPARTMENT
router.post(
  "/addEmployeeToDepartment/:id",
  requireSignIn,
  addEmployeeToDepartmentController
);
//DELETE DEPARTMENT
router.delete(
  "/deleteDepartment/:id",
  requireSignIn,
  deleteDepartmentController
);

module.exports = router;
