const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    StartWorkYear: {
      type: Number,
    },
    DepartmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    IsManager: {
      type: Boolean,
    },
    shifts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
