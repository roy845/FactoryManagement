const mongoose = require("mongoose");

const ShiftSchema = new mongoose.Schema(
  {
    Date: {
      type: Date,
    },
    StartingHour: {
      type: Number,
    },
    EndingHour: {
      type: Number,
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

module.exports = mongoose.model("Shift", ShiftSchema);
