import { logAction } from "../serverAPI";
import { toast } from "react-hot-toast";
const handleLogFileAction = async (setAuth, navigate) => {
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

export default handleLogFileAction;
