import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-hot-toast";
import moment from "moment";
import useLogger from "../hooks/useLooger";
import { useAuth } from "../context/auth";
import Spinner from "../components/Spinner";
import {
  addEmployeeToShiftUpdateShift,
  getAllAvailableEmployeesForShift,
  getShift,
  updateShift,
} from "../serverAPI";
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
  table: {},
  tableRow: {
    "& > *": {
      border: "1px solid black",
    },
  },
  tableHeadCell: {
    border: "1px solid black",
  },
});

const UpdateShift = () => {
  const [Date, setDate] = useState();
  const [StartingHour, setStartingHour] = useState();
  const [EndingHour, setEndingHour] = useState();
  const [shift, setShift] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const classes = useStyles();
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  useLogger();

  useEffect(() => {
    const fetchShift = async () => {
      try {
        setIsLoading(true);
        const { data } = await getShift(id);
        setIsLoading(false);
        setDate(moment(data.Date));
        setStartingHour(parseInt(data.StartingHour));
        setEndingHour(parseInt(data.EndingHour));
        setShift(data.shift);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchShift();
  }, []);

  useEffect(() => {
    const fetchAvailableEmployees = async () => {
      try {
        setIsLoading(true);
        const { data } = await getAllAvailableEmployeesForShift(id);
        setIsLoading(false);
        setAvailableEmployees(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchAvailableEmployees();
  }, []);

  const handleUpdate = async () => {
    try {
      const UpdatedShift = {
        Date: Date,
        StartingHour: StartingHour,
        EndingHour: EndingHour,
      };

      const { data } = await updateShift(id, selectedEmployee, UpdatedShift);

      toast.success("shift updated successfully");
      handleLogFileAction(setAuth, navigate);
      navigate("/shifts");

      setDate("");
      setStartingHour("");
      setEndingHour("");
    } catch (error) {
      toast.error(error);
    }
  };
  const addEmployeToShift = async () => {
    try {
      const { data } = await addEmployeeToShiftUpdateShift(
        id,
        selectedEmployee
      );
      toast.success(data.message);
      handleLogFileAction(setAuth, navigate);
      navigate("/shifts");

      setDate("");
      setStartingHour("");
      setEndingHour("");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Layout title={"Edit Shift"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2>Edit Shift</h2>

            {/* Update shift */}
            <form>
              <DatePicker
                value={Date}
                required
                onChange={(date) => setDate(date._d)}
              />

              <br />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="startingHour"
                label="Starting Hour"
                name="StartingHour"
                autoComplete="StartingHour"
                autoFocus
                value={StartingHour}
                onChange={(e) => setStartingHour(parseInt(e.target.value))}
              />

              <br />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="endingHour"
                label="Ending Hour"
                name="EndingHour"
                autoComplete="EndingHour"
                autoFocus
                value={EndingHour}
                onChange={(e) => setEndingHour(parseInt(e.target.value))}
              />
              <br />
            </form>
            {/* Available employees table */}

            {availableEmployees.length > 0 ? (
              <>
                {" "}
                <label>Available workers: </label>
                <TableContainer
                  className={classes.tableContainer}
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeadCell}>
                          First Name
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Last Name
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Department
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {availableEmployees.map((employee) => (
                        <TableRow
                          onClick={() => setSelectedEmployee(employee?._id)}
                          selected={selectedEmployee === employee?._id}
                          hover
                          key={employee._id}
                          className={classes.tableRow}
                        >
                          <TableCell>{employee.FirstName}</TableCell>
                          <TableCell>{employee.LastName}</TableCell>
                          <TableCell>{employee.DepartmentID?.Name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <p>No employees available</p>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              {availableEmployees.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addEmployeToShift}
                >
                  ADD
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                UPDATE
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/shifts")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default UpdateShift;
