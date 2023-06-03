import { useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import API_URLS from "../serverAPI";

const useLogger = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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

    handleLogFileAction();
  }, []);

  return null;
};

export default useLogger;
