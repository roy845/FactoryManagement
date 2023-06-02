const Employee = require("../models/Employee");
const Shift = require("../models/Shift");

module.exports = {
  addShiftController: async (req, res) => {
    try {
      const { Date, StartingHour, EndingHour } = req.body;

      const shift = new Shift({
        Date,
        StartingHour,
        EndingHour,
      });

      const createdShift = await shift.save();

      res
        .status(201)
        .send({ createdShift, message: "Shift created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to create shift" });
    }
  },

  getShift: async (req, res) => {
    try {
      const { id } = req.params;

      const shift = await Shift.findById(id);

      if (!shift) {
        return res.status(404).send({ message: "Shift not found" });
      }

      res.status(200).send(shift);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to retrieve shift" });
    }
  },

  updateShiftController: async (req, res) => {
    try {
      const { id } = req.params;
      const { Date, StartingHour, EndingHour } = req.body;

      const shift = await Shift.findById(id);

      if (!shift) {
        return res.status(404).send({ message: "Shift not found" });
      }

      shift.Date = Date || shift.Date;
      shift.StartingHour = StartingHour || shift.StartingHour;
      shift.EndingHour = EndingHour || shift.EndingHour;

      const updatedShift = await shift.save();

      res.status(200).send(updatedShift);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to update shift" });
    }
  },
  getAllShiftsController: async (req, res) => {
    try {
      const shifts = await Shift.find({}).populate("employees");
      res.status(200).send(shifts);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to retrieve shifts" });
    }
  },
  addEmployeeToShiftController: async (req, res) => {
    try {
      const { shiftID } = req.params;
      const { employeeId } = req.body;

      const shift = await Shift.findById(shiftID);

      if (!shift) {
        return res.status(404).send({ message: "Shift not found" });
      }

      shift.employees.push(employeeId);

      await Employee.findByIdAndUpdate(employeeId, {
        $push: { shifts: shiftID },
      });

      await shift.save();

      res.status(200).send({ message: "Employee added to shift successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to add employee to shift" });
    }
  },
  removeEmployeeFromShiftController: async (req, res) => {
    try {
      const { shiftID } = req.params;
      const { employeeId } = req.body;

      const shift = await Shift.findById(shiftID);

      if (!shift) {
        return res.status(404).send({ message: "Shift not found" });
      }

      const index = shift.employees.indexOf(employeeId);
      if (index !== -1) {
        shift.employees.splice(index, 1);
      }

      await Employee.findByIdAndUpdate(employeeId, {
        $pull: { shifts: shiftID },
      });

      await shift.save();

      res
        .status(200)
        .send({ message: "Employee removed from shift successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to remove employee from shift" });
    }
  },
};
