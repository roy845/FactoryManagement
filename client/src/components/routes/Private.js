import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Navigate, Outlet, useLocation } from "react-router";
import axios from "axios";

const AUTH_URL = "http://localhost:8800/api/auth/user-auth";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();
  const location = useLocation();
  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(`${AUTH_URL}`);

      if (data.ok) setOk(data.ok);
      else setOk(data.ok);
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}
