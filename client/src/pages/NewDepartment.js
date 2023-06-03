import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/auth";
import useLogger from "../hooks/useLooger";
import { createDepartment } from "../serverAPI";
import handleLogFileAction from "../functions/handleLogFileAction";

const NewDepartment = () => {
  const [departmentName, setDepartmentName] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  useLogger();

  const handleSave = async () => {
    try {
      const newDepartment = {
        Name: departmentName,
      };

      const { data } = await createDepartment(newDepartment);
      toast.success(`${data.Name} department created`);

      setDepartmentName("");
      handleLogFileAction(setAuth, navigate);
      navigate("/departments");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/departments");
  };

  return (
    <Layout title={"New Department"}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>New Department</h1>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="departmentName"
            label="Department Name"
            name="departmentName"
            autoComplete="departmentName"
            autoFocus
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </form>
        <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!departmentName}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NewDepartment;
