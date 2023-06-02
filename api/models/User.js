const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
    },
    Email: {
      type: String,
    },
    FullName: {
      type: String,
    },
    NumOfActions: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
