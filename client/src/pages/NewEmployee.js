import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { Select, MenuItem } from "@material-ui/core";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/auth";
import Spinner from "../components/Spinner";
import API_URLS, {
  createEmployee,
  getAllDepartments,
  logAction,
} from "../serverAPI";

const NewEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startWorkYear, setStartWorkYear] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isManager, setIsManager] = useState();
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

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

  const handleLogFileAction = async () => {
    try {
      const { data } = await logAction();
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

  const handleSave = async () => {
    try {
      const newEmployee = {
        FirstName: firstName,
        LastName: lastName,
        StartWorkYear: startWorkYear,
        DepartmentID: selectedDepartment,
        IsManager: isManager,
      };

      const { data } = await createEmployee(newEmployee);
      toast.success(`Employee ${data.FirstName} ${data.LastName} created`);
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

  const handleCancel = () => {
    navigate("/home");
  };

  const canSave =
    !firstName &&
    !lastName &&
    !startWorkYear &&
    !selectedDepartment &&
    !isManager;

  return (
    <Layout title={"New Employee"}>
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
            <h1>New Employee</h1>
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
            </form>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={canSave}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
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

export default NewEmployee;
