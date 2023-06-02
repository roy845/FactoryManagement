import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
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

const EditEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startWorkYear, setStartWorkYear] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isManager, setIsManager] = useState("");
  const [employee, setEmployee] = useState();
  const [selectedShift, setSelectedShift] = useState("");
  const [shifts, setShifts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  useLogger();

  const classes = useStyles();

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
    const getEmployee = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_URLS.getEmployee}${id}`);
        setIsLoading(false);
        setFirstName(data.FirstName);
        setLastName(data.LastName);
        setStartWorkYear(data.StartWorkYear);
        setIsManager(data.IsManager);
        setFirstName(data.FirstName);
        setSelectedDepartment(data.DepartmentID._id);
        setEmployee(data);
      } catch (error) {
        toast.error(error);
      }
    };
    getEmployee();
  }, []);

  useEffect(() => {
    const getAllDepartments = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(API_URLS.getAllDepartments);
        setIsLoading(false);
        setDepartments(data);
      } catch (error) {
        toast.error(error);
      }
    };
    getAllDepartments();
  }, []);

  useEffect(() => {
    const getAllShifts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(API_URLS.getAllShifts);
        setIsLoading(false);
        setShifts(
          data.filter(
            (shift) => !shift.employees.some((employee) => employee?._id === id)
          )
        );
      } catch (error) {
        toast.error(error);
      }
    };
    getAllShifts();
  }, []);

  const handleUpdate = async () => {
    try {
      const UpdatedEmployee = {
        FirstName: firstName,
        LastName: lastName,
        StartWorkYear: startWorkYear,
        DepartmentID: selectedDepartment,
        IsManager: isManager,
      };

      const { data } = await axios.put(
        `${API_URLS.updateEmployee}${id}`,
        UpdatedEmployee
      );

      toast.success(`Employee ${data.FirstName} ${data.LastName} updated`);
      handleLogFileAction();
      navigate("/home");
      setFirstName("");
      setLastName("");
      setStartWorkYear("");
      setSelectedDepartment("");
      setIsManager("");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${API_URLS.deleteEmployee}${id}`);
      toast.success(data.message);
      handleLogFileAction();
      navigate("/home");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAddShift = async (shiftID) => {
    try {
      const { data } = await axios.post(
        `${API_URLS.addEmployeeToShift}${id}/${shiftID}`
      );
      toast.success(data.message);
      handleLogFileAction();
      navigate("/home");
    } catch (error) {
      toast.error(error);
    }
  };

  const canUpdate =
    !firstName &&
    !lastName &&
    !startWorkYear &&
    !selectedDepartment &&
    !isManager;

  return (
    <Layout title={"Edit Employee"}>
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
            <h1>Edit Employee</h1>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="startWorkYear"
                label="Start Work Year"
                name="startWorkYear"
                autoComplete="startWorkYear"
                autoFocus
                value={startWorkYear}
                onChange={(e) => setStartWorkYear(e.target.value)}
              />
              <div>
                <label>Department </label>
                <Select
                  disableUnderline
                  value={selectedDepartment}
                  defaultChecked={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments?.map((department) => (
                    <MenuItem key={department?._id} value={department?._id}>
                      {department.Name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <label>Is Manager ? </label>
                <Select
                  disableUnderline
                  value={isManager}
                  onChange={(e) => setIsManager(e.target.value)}
                >
                  <MenuItem value={false}>{"No"}</MenuItem>
                  <MenuItem value={true}>{"Yes"}</MenuItem>
                </Select>
              </div>
              <div>
                {shifts.length > 0 ? (
                  <>
                    <label> Available Shifts </label>
                    <TableContainer className={classes.table}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.tableHeadCell}>
                              Starting Hour
                            </TableCell>
                            <TableCell className={classes.tableHeadCell}>
                              Ending Hour
                            </TableCell>
                            <TableCell className={classes.tableHeadCell}>
                              Date
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {shifts?.map((shift, index) => (
                            <TableRow
                              key={index}
                              onClick={() => setSelectedShift(shift?._id)}
                              selected={selectedShift === shift?._id}
                              className={classes.tableRow}
                              hover
                            >
                              <TableCell>{shift.StartingHour}</TableCell>
                              <TableCell>{shift.EndingHour}</TableCell>
                              <TableCell>
                                {new Date(shift?.Date).toLocaleDateString(
                                  "en-US"
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                ) : null}

                {employee?.shifts.length > 0 ? (
                  <>
                    <label> My Shifts </label>
                    <TableContainer className={classes.table}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.tableHeadCell}>
                              Starting Hour
                            </TableCell>
                            <TableCell className={classes.tableHeadCell}>
                              Ending Hour
                            </TableCell>
                            <TableCell className={classes.tableHeadCell}>
                              Date
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {employee?.shifts?.map((shift, index) => (
                            <TableRow
                              key={index}
                              onClick={() => setSelectedShift(shift?._id)}
                              selected={selectedShift === shift?._id}
                              className={classes.tableRow}
                              hover
                            >
                              <TableCell>{shift?.StartingHour}</TableCell>
                              <TableCell>{shift?.EndingHour}</TableCell>
                              <TableCell>
                                {new Date(shift?.Date).toLocaleDateString(
                                  "en-US"
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                ) : null}
              </div>
            </form>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddShift(selectedShift)}
                disabled={canUpdate || !selectedShift}
              >
                ADD
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                disabled={canUpdate}
              >
                Update
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                DELETE
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/home")}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default EditEmployee;
