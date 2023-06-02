const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);
