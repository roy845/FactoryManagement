import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, TextField } from "@material-ui/core";
import Layout from "../components/Layout";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";
import useLogger from "../hooks/useLooger";
import { useAuth } from "../context/auth";
import API_URLS from "../serverAPI";

const NewShift = () => {
  const [newShift, setNewShift] = useState({
    Date: "",
    StartingHour: 0,
    EndingHour: 0,
  });

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useLogger();

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

  const createShift = async () => {
    try {
      const { data } = await axios.post(API_URLS.addShift, newShift);
      toast.success(data.message);

      setNewShift({
        Date: "",
        StartingHour: null,
        EndingHour: null,
      });
      handleLogFileAction();
      navigate("/shifts");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Layout title={"New Shift"}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>New Shift</h1>

        {/* Create new shift */}
        <form onSubmit={createShift}>
          <DatePicker
            value={newShift.Date}
            required
            onChange={(date) => setNewShift({ ...newShift, Date: date._d })}
          />

          <br />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={newShift.StartingHour}
            id="startingHour"
            label="Starting Hour"
            name="startingHour"
            autoComplete="StartingHour"
            autoFocus
            onChange={(e) =>
              setNewShift({
                ...newShift,
                StartingHour: parseInt(e.target.value),
              })
            }
          />

          <br />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={newShift.EndingHour}
            id="endingHour"
            label="Ending Hour"
            name="EndingHour"
            autoComplete="EndingHour"
            autoFocus
            onChange={(e) =>
              setNewShift({
                ...newShift,
                EndingHour: parseInt(e.target.value),
              })
            }
          />
          <br />
        </form>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" color="primary" onClick={createShift}>
            Save
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
    </Layout>
  );
};

export default NewShift;
