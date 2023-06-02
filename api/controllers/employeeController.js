const Employee = require("../models/Employee");
const Department = require("../models/Department");
const Shift = require("../models/Shift");

module.exports = {
  addEmployeeController: async (req, res) => {
    try {
      const { FirstName, LastName, StartWorkYear, DepartmentID, IsManager } =
        req.body;

      const newEmployee = new Employee({
        FirstName,
        LastName,
        StartWorkYear,
        DepartmentID,
        IsManager,
      });

      const createdEmployee = await newEmployee.save();

      res.status(201).send(createdEmployee);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to create employee" });
    }
  },
  getAllEmployeesController: async (req, res) => {
    try {
      const employees = await Employee.find({})
        .populate("DepartmentID")
        .populate({
          path: "shifts",
          model: "Shift",
        });

      res.status(200).send(employees);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch employees" });
    }
  },
  getAllManagersController: async (req, res) => {
    try {
      const managers = await Employee.find({ IsManager: true });

      res.status(200).send(managers);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch managers" });
    }
  },

  getEmployeeController: async (req, res) => {
    try {
      const { id } = req.params;

      const employee = await Employee.findById(id)
        .populate("DepartmentID")
        .populate({
          path: "shifts",
          model: "Shift",
        });

      if (!employee) {
        return res.status(404).send({ message: "Employee not found" });
      }

      res.status(200).send(employee);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch employee" });
    }
  },
  updateEmployeeController: async (req, res) => {
    try {
      const { id, shiftID } = req.params;
      const { FirstName, LastName, StartWorkYear, DepartmentID, IsManager } =
        req.body;

      const employee = await Employee.findById(id);

      const prevDepartmentID = employee.DepartmentID;
      const prevIsManager = employee.IsManager;
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        {
          FirstName: FirstName || employee.FirstName,
          LastName: LastName || employee.LastName,
          StartWorkYear: StartWorkYear || employee.StartWorkYear,
          DepartmentID: DepartmentID,
          IsManager: IsManager,
        },
        { new: true }
      );

      if (!employee.DepartmentID.equals(updatedEmployee.DepartmentID)) {
        await Department.findByIdAndUpdate(prevDepartmentID, {
          $pull: { employees: id },
        });

        await Department.findByIdAndUpdate(updatedEmployee.DepartmentID, {
          $push: { employees: id },
        });
      }

      if (prevIsManager && !IsManager) {
        await Department.findByIdAndUpdate(prevDepartmentID, {
          Manager: null,
        });
      }

      if (!prevIsManager && IsManager) {
        await Department.findByIdAndUpdate(DepartmentID, {
          Manager: id,
        });
      }

      res.status(200).send(updatedEmployee);
    } catch (error) {
      res.status(500).send({ message: "Failed to update employee" });
    }
  },

  getAllAvailableEmployeesForShift: async (req, res) => {
    try {
      const { shiftID } = req.params;

      const shift = await Shift.findById(shiftID).populate("employees");

      if (!shift) {
        return res.status(404).send({ message: "Shift not found" });
      }

      const availableEmployees = await Employee.find({
        _id: { $nin: shift.employees },
      }).populate("DepartmentID");

      res.status(200).send(availableEmployees);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to retrieve available employees" });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      const { employeeID } = req.params;

      const employee = await Employee.findById(employeeID);

      if (!employee) {
        return res.status(404).send({ message: "Employee not found" });
      }

      const departmentID = employee.DepartmentID;
      const shiftIDs = employee.shifts.map((shift) => shift.id);

      await Employee.findByIdAndDelete(employeeID);

      await Department.findByIdAndUpdate(departmentID, {
        $pull: { employees: employeeID },
      });

      await Shift.updateMany(
        { _id: { $in: shiftIDs } },
        { $pull: { employees: employeeID } }
      );

      res.status(200).send({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to delete employee" });
    }
  },

  addEmployeeToShift: async (req, res) => {
    try {
      const { shiftID, employeeID } = req.params;

      if (shiftID) {
        const shift = await Shift.findById(shiftID);
        if (shift) {
          if (!shift.employees.includes(employeeID)) {
            await Shift.findByIdAndUpdate(shiftID, {
              $push: { employees: employeeID },
            });

            await Employee.findByIdAndUpdate(employeeID, {
              $push: { shifts: shiftID },
            });
          }
        }
      }
      res.status(200).send({ message: "Employee added to shift" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to add shift employee" });
    }
  },
};
