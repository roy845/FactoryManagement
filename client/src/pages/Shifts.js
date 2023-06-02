import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast } from "react-hot-toast";
import DeleteIcon from "@material-ui/icons/Delete";
import useLogger from "../hooks/useLooger";
import { useAuth } from "../context/auth";
import Spinner from "../components/Spinner";
import API_URLS from "../serverAPI";
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

const Shifts = () => {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();
  useLogger();
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogFileAction = async () => {
    try {
      const { data } = await axios.post(API_URLS.logAction);
      localStorage.setItem("logs", JSON.stringify(data?.actionLog?.actions));
    } catch (err) {
      if (!err || !err.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        setAuth({});
        window.location.replace("/");
        navigate("/");
        localStorage.removeItem("auth");
        localStorage.removeItem("logs");
      } else if (err?.response?.status === 404) {
        toast.error(err?.response?.data.error);
      } else if (err.response?.status === 401) {
        window.location.replace("/");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(API_URLS.getAllShifts);
      setIsLoading(false);
      setShifts(data);
    } catch (error) {
      toast.error(error);
    }
  };

  const removeEmployeFromShift = async (shiftId, employeeId) => {
    try {
      const { data } = await axios.post(
        `${API_URLS.removeEmployeeFromShift}${shiftId}`,
        {
          employeeId: employeeId,
        }
      );
      toast.success(data.message);
      handleLogFileAction();
      navigate("/shifts");
    } catch (error) {
      toast.error(error);
    }
  };

  const removeEmployeeFromUI = (shiftID, employeeID) => {
    const updatedShifts = shifts.map((shift) => {
      if (shift._id === shiftID) {
        const updatedShift = {
          ...shift,
          employees: shift.employees.filter(
            (employee) => employee !== employeeID
          ),
        };
        return updatedShift;
      }
      return shift;
    });

    setShifts(updatedShifts);
  };

  return (
    <Layout title={"Shifts"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2>Shifts</h2>
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeadCell}>
                      Date
                    </TableCell>
                    <TableCell className={classes.tableHeadCell}>
                      Starting Hour
                    </TableCell>
                    <TableCell className={classes.tableHeadCell}>
                      Ending Hour
                    </TableCell>
                    <TableCell className={classes.tableHeadCell}>
                      Allocated Employees
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shifts.map((shift) => (
                    <TableRow
                      key={shift._id}
                      onClick={() => setSelectedShift(shift?._id)}
                      selected={selectedShift === shift?._id}
                      className={classes.tableRow}
                      hover
                    >
                      <TableCell>
                        <Link to={`/editShift/${shift?._id}`}>
                          {new Date(shift?.Date).toLocaleDateString("en-US")}
                        </Link>
                      </TableCell>
                      <TableCell>{shift?.StartingHour}</TableCell>
                      <TableCell>{shift?.EndingHour}</TableCell>

                      <TableCell className={classes.tableHeadCell}>
                        {shift?.employees?.map((employee) => (
                          <div key={employee?._id}>
                            <li>
                              {employee?.FirstName} {employee?.LastName}
                              <DeleteIcon
                                variant="contained"
                                color="secondary"
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => {
                                  removeEmployeeFromUI(
                                    shift?._id,
                                    employee?._id
                                  );
                                  removeEmployeFromShift(
                                    shift?._id,
                                    employee?._id
                                  );
                                }}
                              >
                                REMOVE
                              </DeleteIcon>
                            </li>
                          </div>
                        ))}
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
                onClick={() => navigate("/newShift")}
              >
                NEW SHIFT
              </Button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Shifts;
