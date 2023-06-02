import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { toast } from "react-hot-toast";
import useLogger from "../hooks/useLooger";
import { useAuth } from "../context/auth";
import Spinner from "../components/Spinner";
import API_URLS from "../serverAPI";

const EditDepartment = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [managerId, setManagerId] = useState("");
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  useLogger();
  const canUpdate = !departmentName && !managerId;

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
    const getDepartment = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_URLS.getDepartment}${id}`);
        setIsLoading(false);
        setDepartmentName(data.Name);
        setManagerId(data.Manager);
        setDepartment(data);

        const { data: allEmployees } = await axios.get(
          API_URLS.getAllEmployees
        );

        const employeesNotInDepartment = allEmployees.filter(
          (employee) => !data.employees.includes(employee._id)
        );

        setEmployees(employeesNotInDepartment);
      } catch (error) {}
    };

    getDepartment();
  }, []);

  useEffect(() => {
    const getAllManagers = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(API_URLS.getAllManagers);
        setIsLoading(false);
        setManagers(data);
      } catch (error) {
        toast.error(error);
      }
    };
    getAllManagers();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedDepartment = {
        Name: departmentName,
        Manager: managerId,
      };

      const { data } = await axios.put(
        `${API_URLS.editDepartment}${id}`,
        updatedDepartment
      );
      toast.success(`${data.Name} department updated`);

      setDepartmentName("");
      handleLogFileAction();
      navigate("/departments");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${API_URLS.deleteDepartment}${id}`);
      toast.success(data.message);
      handleLogFileAction();
      navigate("/departments");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSelectedManagerId = (event) => {
    setManagerId(event.target.value);
  };
  const handleSelectedEmployeeId = (event) => {
    setEmployeeId(event.target.value);
    const employee = employees.filter((emp) => emp._id === event.target.value);
    setSelectedEmployee(employee);
  };

  const handleAddEmployee = async () => {
    try {
      const { data } = await axios.post(
        `${API_URLS.addEmployeeToDepartment}${id}`,
        {
          employeeId: employeeId,
        }
      );
      toast.success(
        `Employee ${selectedEmployee[0].FirstName} ${selectedEmployee[0].LastName} assigned to ${department.Name}`
      );
      handleLogFileAction();
      navigate("/departments");
    } catch (error) {}
  };

  return (
    <Layout title={"Edit Department"}>
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
            <h1>Edit Department</h1>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="departmentName"
                label="Department Name"
                name="departmentName"
                autoComplete="departmentName"
                autoFocus
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
              <label>Manager: </label>
              <Select
                value={managerId}
                onChange={handleSelectedManagerId}
                disableUnderline
              >
                {managers?.map((manager, index) => (
                  <MenuItem key={index} value={manager?._id}>
                    {manager?.FirstName} {manager?.LastName}
                  </MenuItem>
                ))}
              </Select>
              <label>Employees do not belong: </label>
              <Select
                value={employeeId}
                onChange={handleSelectedEmployeeId}
                disableUnderline
              >
                {employees?.map((employee, index) => (
                  <MenuItem key={index} value={employee?._id}>
                    {employee?.FirstName} {employee?.LastName}
                  </MenuItem>
                ))}
              </Select>
            </form>
            <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
              <Button
                variant="contained"
                color="primary"
                disabled={canUpdate}
                onClick={handleAddEmployee}
              >
                ADD
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={canUpdate}
                onClick={handleUpdate}
              >
                UPDATE
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                DELETE
              </Button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default EditDepartment;
