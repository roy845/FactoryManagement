import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { toast } from "react-hot-toast";
import useLogger from "../hooks/useLooger";
import { useAuth } from "../context/auth";
import Spinner from "../components/Spinner";
import { getAllDepartments } from "../serverAPI";
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

const DepartmentPage = () => {
  const classes = useStyles();
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  useLogger();

  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        setIsLoading(true);
        const { data } = await getAllDepartments();
        setIsLoading(false);
        setDepartments(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchAllDepartments();
  }, []);

  return (
    <Layout title={"Departments"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className={classes.header}>Departments Table</h2>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    Department Name
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Manager Name
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Employees
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments?.map((department, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    <TableCell component="th" scope="row">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/editDepartment/${department?._id}`}
                      >
                        {department?.Name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/editEmployee/${department?.Manager?._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {department?.Manager?.FirstName}{" "}
                        {department?.Manager?.LastName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <ul>
                        {department?.employees?.map(
                          (employee, employeeIndex) => (
                            <li key={employeeIndex}>
                              <Link
                                to={`/editEmployee/${employee?._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                {employee?.FirstName} {employee.LastName}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.bottomContainer}>
            <Button
              onClick={() => {
                navigate("/newDepartment");
                handleLogFileAction(setAuth, navigate);
              }}
              variant="contained"
              color="primary"
            >
              New Department
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default DepartmentPage;
