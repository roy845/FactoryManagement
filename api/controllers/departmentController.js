const Department = require("../models/Department");
const Employee = require("../models/Employee");

module.exports = {
  addDepartmentController: async (req, res) => {
    try {
      const { Name } = req.body;
      const newDepartment = new Department({ Name });

      const createdDepartment = await newDepartment.save();
      res.status(201).send(createdDepartment);
    } catch (error) {
      res.status(500).send({ message: "Failed to create department" });
    }
  },
  getAllDepartmentsController: async (req, res) => {
    try {
      const departments = await Department.find({})
        .populate("Manager")
        .populate("employees");

      res.status(200).send(departments);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch departments" });
    }
  },
  getDepartmentController: async (req, res) => {
    try {
      const { id } = req.params;

      const department = await Department.findById(id);
      if (!department) {
        return res.status(404).send({ message: "Department not found" });
      }

      res.status(200).send(department);
    } catch (error) {
      res.status(500).send({ message: "Failed to fetch department" });
    }
  },
  updateDepartmentController: async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, Manager } = req.body;
      const department = await Department.findById(id);
      const updatedDepartment = await Department.findByIdAndUpdate(
        id,
        {
          Name: Name || department.Name,
          Manager: Manager || department.Manager,
        },
        { new: true }
      );

      res.status(200).send(updatedDepartment);
    } catch (error) {
      res.status(500).send({ message: "Failed to update department" });
    }
  },
  addEmployeeToDepartmentController: async (req, res) => {
    try {
      const { id } = req.params;
      const { employeeId } = req.body;

      const updatedDepartment = await Department.findOneAndUpdate(
        { _id: id },
        { $push: { employees: employeeId } },
        { new: true }
      );

      if (!updatedDepartment) {
        return res.status(404).send({ message: "Department not found" });
      }

      const currentDepartment = await Department.findOneAndUpdate(
        { _id: { $ne: id }, employees: employeeId },
        { $pull: { employees: employeeId } }
      );

      if (currentDepartment) {
        await Employee.findByIdAndUpdate(employeeId, { department: id });
      }

      res
        .status(200)
        .send({ message: "Employee added to department successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to update department" });
    }
  },

  deleteDepartmentController: async (req, res) => {
    try {
      const { id } = req.params;

      const department = await Department.findById(id);

      if (!department) {
        return res.status(404).send({ message: "Department not found" });
      }

      await Employee.updateMany(
        { DepartmentID: id },
        { $unset: { DepartmentID: 1 } }
      );

      await Department.findByIdAndDelete(id);

      res.status(200).send({
        message: "Department and associated employee data deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Failed to delete department and associated employee data",
      });
    }
  },
};
