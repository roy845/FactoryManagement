const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/dbConn");
const authRoutes = require("./routes/authRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const shiftRoutes = require("./routes/shiftRoutes");
const usersRoutes = require("./routes/usersRoutes");

const morgan = require("morgan");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 8800;

//database connection
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/shift", shiftRoutes);
app.use("/api/users", usersRoutes);

app.listen(8800, () =>
  console.log(`Backend server is running on PORT ${PORT}`)
);
