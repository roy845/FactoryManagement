import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { toast } from "react-hot-toast";
import useLogger from "../hooks/useLooger";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/auth";
import { getAllEmployees, getAllDepartments } from "../serverAPI";
import handleLogFileAction from "../functions/handleLogFileAction";

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 600,
    margin: "auto",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  bottomContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  table: {
    border: "1px solid black",
  },
  tableRow: {
    "& > *": {
      border: "1px solid black",
    },
  },
  tableHeadCell: {
    border: "1px solid black",
    fontWeight: "bold",
  },
});

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const { setAuth } = useAuth();
  useLogger();

  const navigate = useNavigate();
  const classes = useStyles();

  const handleDepartmentChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDepartment(event.target.value);
    setSelectedDepartment(selectedValue === "" ? "" : selectedValue);
    handleLogFileAction(setAuth, navigate);
  };
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFilteredEmployees(
      selectedDepartment
        ? employees?.filter(
            (employee) => employee?.DepartmentID?.Name === selectedDepartment
          )
        : employees
    );
  }, [selectedDepartment, employees]);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        setIsLoading(true);
        const { data } = await getAllEmployees();
        setEmployees(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error);
        if (error?.response?.status === 401) {
          window.location.replace("/");
          navigate("/");
        }
      }
    };
    fetchAllEmployees();
  }, [navigate]);

  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        setIsLoading(true);
        const { data } = await getAllDepartments();
        setDepartments(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error);
        if (error?.response?.status === 401) {
          window.location.replace("/");
          navigate("/");
        }
      }
    };
    fetchAllDepartments();
  }, [navigate]);

  return (
    <Layout title={"Home - Employees"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className={classes.header}>Employees Table</h2>\
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    Full Name
                  </TableCell>

                  <TableCell className={classes.tableHeadCell}>
                    <Select
                      value={selectedDepartment}
                      onChange={handleDepartmentChange}
                      disableUnderline
                    >
                      <MenuItem value="">All Departments</MenuItem>
                      {departments?.map((department, index) => (
                        <MenuItem key={index} value={department.Name}>
                          {department.Name}
                        </MenuItem>
                      ))}
                    </Select>
                    Department
                  </TableCell>

                  <TableCell className={classes.tableHeadCell}>
                    Shifts
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees?.map((employee, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    <TableCell component="th" scope="row">
                      <Link
                        to={`/editEmployee/${employee?._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {employee?.FirstName} {employee?.LastName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/editDepartment/${employee.DepartmentID?._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {employee.DepartmentID?.Name}
                      </Link>
                    </TableCell>
                    <TableCell className={classes.tableHeadCell}>
                      <ul>
                        {employee?.shifts?.map((shift, shiftIndex) => (
                          <li key={shiftIndex}>
                            {new Date(shift?.Date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}{" "}
                            {shift.StartingHour} to {shift.EndingHour}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.bottomContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/newEmployee");
                handleLogFileAction(setAuth, navigate);
              }}
            >
              New Employee
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default EmployeesPage;
